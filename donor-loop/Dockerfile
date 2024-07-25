
FROM maven:3.9.8
# Just echo so we can see, if everything is there :)

RUN ls -l

# Run Maven build
RUN mvn clean install

FROM openjdk:11-jre-slim

VOLUME /tmp

USER 10014

COPY --from=0 "/target/donor-loop-0.0.1-SNAPSHOT.jar" donor-loop.jar

# Fire up our Spring Boot app by default
CMD [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar donor-loop.jar" ]