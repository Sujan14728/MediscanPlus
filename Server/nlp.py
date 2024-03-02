import json

import en_core_med7_lg
import numpy as np
import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

with open("drug_data.json", "r") as f:
    data = json.load(f)


def get_drugs(label: str):
    nlp = spacy.load("en_core_med7_lg")
    doc = nlp(label)
    drug_names = [ent.text for ent in doc.ents if ent.label_ == "DRUG"]
    string = " ".join(map(str, drug_names))
    
    return string


def cosine(drug_names: str):
    all_keys = list(data.keys())
    # Combine the query document with the existing documents
    all_documents = all_keys + [drug_names]

    # Create a CountVectorizer to convert the documents into a bag-of-words representation
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(all_documents)

    # Calculate cosine similarity between the query document and all other documents
    cosine_similarities = cosine_similarity(X[-1], X[:-1]).flatten()

    # Find the indices of the top N most similar documents
    top_n_indices = np.argsort(cosine_similarities)[-1:][::-1]

    result = []
    for index in top_n_indices:
        print(f"Document {index}: {all_keys[index]}")
        print(f"Cosine Similarity: {cosine_similarities[index]}")
        result.append(all_keys[index])
    if cosine_similarities[index] <0.1:
        return False
    return all_keys[index]


def get_result(drug_key: str):
    return data[drug_key]


if __name__ == "__main__":
    print(
        get_result(
            cosine(
                get_drugs(
                    "30 capsules Cipla Rx Formotero Fumarate and Budesonide Powder For Inhalation IP foracort rotacaps 200"
                )
            )
        )
    )
