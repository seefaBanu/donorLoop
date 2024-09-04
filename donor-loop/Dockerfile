#FROM maven:3.9.8 AS build
#
#ADD . /donor-loop
#WORKDIR /donor-loop
#COPY pom.xml .
#COPY src ./src
#
#RUN ls -l
#
## Run Maven build
#RUN mvn clean install -DskipTests
#
#FROM openjdk:22-slim
#WORKDIR /donor-loop
#VOLUME /tmp
#USER 10014
#ENV SPRING_PROFILES_ACTIVE=prod
#COPY --from=build /donor-loop/target/donor-loop-0.0.1-SNAPSHOT.jar ./donor-loop.jar
#EXPOSE 8080
## Fire up our Spring Boot app by default
#CMD [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar donor-loop.jar" ]

# Use a base image with JDK installed
FROM openjdk:22-slim

# Set the working directory inside the container
WORKDIR /donor-loop

# Copy the application JAR file to the container
COPY target/donor-loop-0.0.1-SNAPSHOT.jar donor-loop.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8080
USER 10014
ENV SPRING_PROFILES_ACTIVE=prod
ENV SPRING_DATASOURCE_URL=jdbc:mysql://donorloopdb.cv2mei6egmjy.ap-southeast-2.rds.amazonaws.com:3306/donorloop
ENV SPRING_DATASOURCE_USERNAME=admin
ENV SPRING_DATASOURCE_PASSWORD=19990928S
ENV SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver
ENV SPRING_JWT_AUDIENCE=3ctl4QB9EGLe35WOxfDhW3ytfAQa
ENV UPLOAD_DIR=/Users/seefabanu/Documents/Projects/donar-loop/web-app/public
ENV SPRING_MAIL_PASSWORD="qltb aojs klja riwm"
ENV SPRING_MAIL_USERNAME=seefabanugafoor@gmail.com


# Run the application with Java, passing in environment variables
ENTRYPOINT ["java", "-jar", "donor-loop.jar"]
