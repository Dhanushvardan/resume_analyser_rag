from fastapi import FastAPI
from fastapi import File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pdfplumber
from openai import OpenAI
from typing import TypedDict
from langgraph.graph import  StateGraph
from langchain_core.documents import Document
# from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os
from dotenv import load_dotenv


load_dotenv()





llm = OpenAI(
    api_key = os.getenv("api_key"),
    base_url = "https://api.groq.com/openai/v1",
   
)

class t(BaseModel):
    qs : str

# class state(dict):
#     pass

class state(TypedDict):
    question: str
    txt: str
    context: str
    answer: str
    inpp:str
    ct:str
    oppp:str

text = ""
inp = ""

embeddings = HuggingFaceEmbeddings(model_name = "sentence-transformers/all-MiniLM-L6-v2")


def ragNode(state):
    docs = [Document(page_content=state["txt"], metadata={"id": 1})]
    vectorstore = FAISS.from_documents(docs, embeddings)
    retriever = vectorstore.as_retriever()
    dd = retriever.get_relevant_documents(state["inpp"])
    context = "\n".join([d.page_content for d in dd])


    

    return {"inpp":state["inpp"],"ct":context}


def AnalyseNode(state):

    res = llm.chat.completions.create(model="llama-3.3-70b-versatile",messages=[{"role":"user","content":state["inpp"] + "now answer for the context of the question" + state["ct"]}])

    

    return {"oppp":res.choices[0].message.content}







graph = StateGraph(state)
graph.add_node("ragNode", ragNode)
graph.add_node("anNode", AnalyseNode)
graph.add_edge("ragNode", "anNode")
graph.set_entry_point("ragNode")

app_graph = graph.compile()







app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_headers = ["*"],
    allow_methods = ["*"],
    allow_origins = ["*"],
    allow_credentials = True,
)


@app.get("/")
def getApp():
    return "Backend is running"



@app.post("/form")
def getForm(file: UploadFile = File(...)):
    global text 
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    

    print(text)
    return "done"


@app.post("/qs")
def getQs(req : t):
    inp = req.qs

    res = app_graph.invoke({"inpp":inp, "txt":text})

    return res["oppp"]


