# MediscanPlus
Minor Project BCT 077 Batch

#Running client
- npm install
- npx expo start

# to sync with the project
git pull origin main

# Report
# Medicine Information Scanner

Our team has developed a cutting-edge application that leverages advanced technologies such as Optical Character Recognition (OCR) and Natural Language Processing (NLP) to provide users with quick access to information about medicines through image scanning.

## Objective
The primary goal of the application is to enhance healthcare accessibility by enabling users to extract and analyze text data from images of medicine labels or packaging. By automating the process of researching medications, we aim to streamline decision-making and promote proactive healthcare management.

## Key Features
- **Image Scanning**: Users can easily capture images of medicine labels using their device's camera.
- **Text Extraction**: The application extracts text data from scanned images with high accuracy using OCR technology.
- **Information Retrieval**: Through NLP analysis (NER), useful information about the drug composition and name is extracted, and relevant information about medicine uses and side effects is provided to users.
- **User-Friendly Interface**: We've designed an intuitive and user-friendly interface to ensure a seamless user experience.

## Implementation

### 5.1 Requirements Analysis
Conduct a thorough analysis of user requirements and expectations to define the scope and features of the application. Identify key functionalities such as image scanning, text extraction, medication information retrieval, and user interface design.

### 5.2 Technology Selection
Choose appropriate technologies and tools for implementing OCR and NLP functionalities. Consider using established libraries or frameworks for OCR (e.g., Tesseract) and NLP (e.g., spaCy or NLTK) to streamline development.

### 5.3 Development Environment Setup
Set up the development environment with necessary dependencies, including OCR and NLP libraries, as well as any additional libraries or frameworks required for building the application.

### 5.4 Image Scanning Module
Implement the image scanning module to capture images of medicine labels or packaging using the device’s camera. Integrate functionalities for image cropping, resizing, and preprocessing to enhance OCR accuracy.

### 5.5 OCR Implementation
Develop the OCR module to extract text data from the scanned images. Configure OCR parameters and preprocessing techniques to improve accuracy, considering factors such as image quality, font type, and language.

### 5.6 NLP Analysis
Implement the NLP module to analyze the extracted text data and identify relevant information about medicine uses and side effects. Utilize NLP algorithms for text classification, entity recognition, and sentiment analysis to extract meaningful insights.

### 5.7 User Interface Design
Design an intuitive and user-friendly interface for the application, incorporating features such as the home page, camera interface, and output page. Ensure compatibility with mobile devices and optimize for responsiveness and usability.

### 5.8 Integration and Testing
Integrate the OCR, NLP, and user interface modules into a cohesive application framework. Conduct comprehensive testing to validate the functionality, accuracy, and performance of the application under various scenarios and input conditions.

## Data Source

### 6.1 Primary Data Source
Primary data refers to the firsthand data gathered by the researchers themselves using observations, experiments, surveys, questionnaires, personal interviews, etc. This reliable real-time data was collected via local pharmacies in Nepal to include generic medicines not available in existing datasets.

### 6.2 Secondary Data Source
The Natural Language Processing Model was trained and tested using a dataset consisting of various medicine data, along with their corresponding labels and information about their uses and side effects. Additionally, publicly available datasets and custom-collected images were used to enhance the model’s performance and robustness. Data was collected primarily from websites like 1mg.com and nepmeds.com.np.

## Result and Discussion

### 7.1 User Interface
We have a simple UI where we provide a button to the end users that, when clicked, will access their primary camera to scan the image of the medicine.

### 7.2 Scanning Image
Users can then capture an image of their medicine from the side where information about the medicine is provided, ensuring proper scanning.

### 7.3 Drug Identification
Users will then get detailed information about the name of the medicine, uses, and side effects. They can exit the page and scan another medicine as needed.

## Conclusions and Limitations

### 8.1 Conclusions
The project represents a significant step towards leveraging technology to enhance healthcare accessibility and empower individuals in making informed decisions about medication usage. By enabling users to extract information about medicines through image scanning, it addresses the need for quick and convenient access to healthcare information, particularly for those with limited access to healthcare professionals.

### 8.2 Limitations
- **OCR Accuracy**: The accuracy of text extraction from images using OCR technology may vary depending on factors such as image quality, font type, and language. Errors in text recognition could lead to inaccuracies in the extracted information, affecting the reliability of the results.
- **NLP Performance**: While NLP algorithms can effectively analyze text data to extract uses and side effects of medicines, their performance may be influenced by factors such as the complexity of medical terminology, variations in language structure, and ambiguity in textual descriptions. This could result in incomplete or inaccurate outputs.
- **Database Dependence**: The accuracy and relevance of the extracted information rely heavily on the comprehensiveness and accuracy of the underlying database of medicines, uses, and side effects. Incomplete or outdated information in the database may limit the project’s effectiveness in providing reliable information to users.
- **Privacy and Security**: The transmission of images and extracted text data over networks, including communication with the FastAPI server, poses potential privacy and security risks. Measures must be implemented to safeguard user data and ensure compliance with data protection regulations.
- **Technical Dependencies**: The project’s functionality is contingent on the availability and reliability of OCR and NLP technologies, as well as the performance of the FastAPI server. Technical issues or outages in any of these components could disrupt the user experience and impair the project’s functionality.
- **User Interface Complexity**: Integrating OCR and NLP functionalities into a user-friendly mobile app interface while maintaining responsiveness and simplicity can be challenging. Balancing technical sophistication with intuitive design requires careful consideration of user experience principles.

## References
1. Liu, X., Meehan, J., Tong, W., Wu, L., Xu, X., & Xu, J. (2020). DLI-IT: A Deep Learning Approach to Drug Label Identification Through Image and Text Embedding. *BMC Medical Informatics and Decision Making, 20*(1).
2. Ting, H.-W., Chung, S.-L., Chen, C.-F., Chiu, H.-Y., & Hsieh, Y.-W. (2020). A Drug Identification Model Developed Using Deep Learning Technologies: Experience of a Medical Center in Taiwan. *BMC Health Services Research, 20*, 1.
3. Sharma, A., Amrita, Chakraborty, S., & Kumar, S. (2022). Named Entity Recognition in Natural Language Processing: A Systematic Review. In *Proceedings of Second Doctoral Symposium on Computational Intelligence: DoSCI 2021* (pp. 817-828). Springer Singapore.
4. Bjorne, J., Kaewphan, S., & Salakoski, T. (2013). UTurku: Drug Named Entity Recognition and Drug-Drug Interaction Extraction Using SVM Classification and Domain Knowledge. In *Second Joint Conference on Lexical and Computational Semantics (*SEM), Vol. 2*.
5. Rahutomo, F., Kitasuka, T., & Aritsugi, M. (2012). Semantic Cosine Similarity. In *The 7th International Student Conference on Advanced Science and Technology ICAST, Vol. 4*, 1.
6. Razavi, S., & Sharifian, S. (2015). Comparison of Wrapper Based Feature Selection and Classifier Selection Methods for Drug Named Entity Recognition. *Emu.edu.tr*.
