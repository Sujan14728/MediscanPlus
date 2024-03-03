import spacy
import en_core_med7_lg

nlp = spacy.load("content/model-best")


with open("text.txt") as f:
    text = f.read()
ls = list(text.strip().split("\n"))
ls = [l for l in ls if l != ""]
print(ls)

for label in ls:

    doc = nlp(label)
    each = [ent.text for ent in doc.ents if ent.label_ == "DRUG"]
    print(each)
