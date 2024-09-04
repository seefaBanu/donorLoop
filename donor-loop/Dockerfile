FROM maven:3.9.8 AS build

ADD . /donor-loop
WORKDIR /donor-loop
COPY pom.xml .
COPY src ./src

RUN ls -l

# Run Maven build
RUN mvn clean install -DskipTests

FROM openjdk:22-slim
WORKDIR /donor-loop
VOLUME /tmp
USER 10014
ENV SPRING_PROFILES_ACTIVE=prod
COPY --from=build /donor-loop/target/donor-loop-0.0.1-SNAPSHOT.jar ./donor-loop.jar
EXPOSE 8080
# Fire up our Spring Boot app by default
CMD [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar donor-loop.jar" ]

