import json

def get_conteudo():
    conteudos = {}
    with open("./utils/conteudos.json", "r") as file:
            conteudos = json.load(file)
    return conteudos
        
