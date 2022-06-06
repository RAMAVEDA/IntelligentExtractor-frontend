
# Intelligent Extractor

A Low-Code/No-Code based Product which is scalable (hosted on Azure Kubernetes with CI CD) to enable Intelligent Data extraction to accelerate data entry for Loan Officers/other Finance product users using Computer Vision of Azure, Self Service Bot with QnA Maker for answering Financial related Questions, Prediction for Mortgage approval/House pricing - Azure ML model


## Deployment

To deploy this project run

### Required Azure Services for deployment
- Azure QNA Maker boot
- Azure container registry
- Azure kubernetes cluster 

### Conifugration changes

- Create a Azure QNA maker boot webservice and include end along with key
  in src/views/bot/BotView/index.js#L32
- Add pyhon URL in .env file as shown below
  ```bash
    REACT_APP_BASE_URL = "http://intelligent-backend.com/"
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
  ```


## Authors

- [@RAMAKRISHNAN VEDANARAYANAN](https://github.com/RAMAVEDA)
- [@SAKTHI PRAKASH](https://github.com/sha1509)

