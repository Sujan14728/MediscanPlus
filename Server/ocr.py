import easyocr
from PIL import Image
import re


class TextRecognizer:
    def __init__(self, img: str):
        reader = easyocr.Reader(["en"])
        self.results = reader.readtext(img)
        self.extracted_text = self.get_text()

    def get_text(self):
        extracted_text = ""
        for i in range(len(self.results)):
            extracted_text += " " + self.results[i][1]

        return extracted_text

    def clean_text(self):
        cleanText = re.sub("http\S+\s", " ", self.extracted_text)
        cleanText = re.sub("RT|cc", " ", cleanText)
        cleanText = re.sub("#\S+\s", " ", cleanText)
        cleanText = re.sub("@\S+", "  ", cleanText)
        cleanText = re.sub(
            "[%s]" % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), " ", cleanText
        )
        cleanText = re.sub(r"[^\x00-\x7f]", " ", cleanText)
        cleanText = re.sub("\s+", " ", cleanText)
        return cleanText


# if __name__ == "__main__":
#     tr = TextRecognizer("test2.jpg")
#     print(tr.clean_text())
