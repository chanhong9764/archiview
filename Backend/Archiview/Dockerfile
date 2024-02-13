FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 11443
ENV TZ Asia/Seoul
ENTRYPOINT ["java","-jar","/app.jar"]
