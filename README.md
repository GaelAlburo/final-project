# **Cloud Service Marketplace**  

This project is a web application designed to act as an interface between cloud service providers and their clients. It includes features such as user authentication, service browsing, billing, and client support.

## **Features**  
- User Authentication (Login/Logout)  
- Service Management (View, Hire, Create, and Update Services)  
- Billing and Invoicing  
- Responsive UI with Material-UI  
- Dockerized for ease of deployment and scalability  


## **Getting Started**  

### **Prerequisites**  
Make sure you have the following installed on your system:  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

### **Project Structure**  

```plaintext
project-root/
├── front/                  # Contains the frontend code and Dockerfile
├── services_API/           # Contains the backend code and Dockerfile
├── bills_API/              # Contains the backend code and Dockerfile
├── database/               # Contains database configuration and Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── README.md               # Project documentation
└── .env                    # Environment variables
```  

---

### **Setup Instructions**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd final-project
   ```  

2. **Build an optimized front**
    ```bash
   cd front
   npm install
   npm run build
   ```  
   This command will:  
   - Build an optimized production build of the frontend.  
   - This optimized build will be the one containerized.  

2. **Start the Application with Docker Compose**  
   ```bash
   docker-compose up --d
   ```  
   This command will:  
   - Build Docker images for each service (`frontend`, `API's`, and `mongodb`).  
   - Start all services in separate containers.  

3. **Access the Application**  
   - The web app will be available at `http://localhost:3000`.  

---

### **Docker Compose Services**  

- **fron**:  
  Hosts the React-based frontend.

- **services_API**:  
  Manages the services API endpoints.  

- **bills_API**:  
  Manages the bills API endpoints.  

- **database**:  
  Handles data storage for user information, services, reviews, and billing.  

---

### **Stopping the Application**  
To stop the application, run:  
```bash
docker-compose down
```  

---
