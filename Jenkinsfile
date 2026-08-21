pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'

                checkout scm
            }
        }


        stage('Maven Build') {
            steps {
                echo 'Building Spring Boot application...'

                sh '''
                    cd backend
                    mvn clean package -DskipTests
                '''
            }
        }


        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'

                sh '''
                    cd backend
                    mvn test
                '''
            }
        }


        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'

                sh '''
                    docker compose build
                '''
            }
        }


        stage('Deploy') {
            steps {
                echo 'Deploying application...'

                sh '''
                    docker compose down --remove-orphans || true
                    docker compose up -d
                '''
            }
        }


        stage('Verify') {
            steps {
                echo 'Verifying application...'

                sh '''
                    echo "Waiting for application to start..."
                    sleep 15

                    echo "Checking containers..."
                    docker compose ps

                    echo "Testing Employee API..."
                    curl --fail --silent --show-error http://localhost/api/employees

                    echo ""
                    echo "Application verification successful!"
                '''
            }
        }
    }


    post {

        success {
            echo '========================================='
            echo 'CI/CD Pipeline completed successfully!'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'CI/CD Pipeline failed!'
            echo '========================================='

            sh '''
                docker compose ps || true
            '''
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
