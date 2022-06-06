
# Intelligent Extractor

A Low-Code/No-Code based Product which is scalable (hosted on Azure Kubernetes with CI CD) to enable Intelligent Data extraction to accelerate data entry for Loan Officers/other Finance product users using Computer Vision of Azure, Self Service Bot with QnA Maker for answering Financial related Questions, Prediction for Mortgage approval/House pricing - Azure ML model


## Deployment

To deploy this project follow below instructions.

Deploy [IntelligentExtractor-backend](https://github.com/RAMAVEDA/IntelligentExtractor-backend.git) and get URL of deployment before starting Frontend deployemnt

### Required Azure Services for deployment

- Azure QnA Maker for Bot
- Azure Container registry for hosting Docker images/optional to have DockerHub
- Azure Kubernetes cluster 

### Configration changes

- Create a Azure QnA maker boot webservice and include end along with key
  in src/views/bot/BotView/index.js#L32
- Add python URL in .env file as shown below
  ```bash
    REACT_APP_BASE_URL = "http://intelligentextractor-backend.com/"
  ```
### Deployment steps

  ```bash
    git clone https://github.com/RAMAVEDA/IntelligentExtractor-frontend.git
    cd IntelligentExtractor-frontend
    docker build -t intelligentextrator-frontend .
    docker tag intelligentextrator-frontend {username}/intelligentextrator-frontend
    docker login 
    docker push  {username}/intelligentextrator-frontend
    Create deployment.yml(point to docker image : {username}/intelligentextrator-frontend) and service.yml
    kubectl apply -f deployment.yml
    kubectl apply -f service.yml
  ```**

### Sample Images

Provided Sample Images under "Samples" folder of this repository for testing this application

## Authors

- [@RAMAKRISHNAN VEDANARAYANAN](https://github.com/RAMAVEDA)
- [@SAKTHI PRAKASH](https://github.com/sha1509)

