package com.ssafy.archiview.signalingserver.controller;

import io.openvidu.java.client.*;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
public class CallController {
    // application.properties의 환경변수로 동적할당
    // URL의 경우 dev(로컬호스트), prod(도커 컨테이너 연결)로 서로 다르게 동작
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openVidu;

    @PostConstruct
    public void init() {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param   params  세션 정보를 담은 SessionProperties 객체
     * @return          세션 ID
     */
    @PostMapping
    public ResponseEntity<String> initSession(@RequestBody(required = false)Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties sessionProperties = SessionProperties.fromJson(params).build();
        Session session = openVidu.createSession(sessionProperties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    @PostMapping("/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
        throws OpenViduHttpException, OpenViduJavaClientException {
        Session session = openVidu.getActiveSession(sessionId);

        if (session == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        ConnectionProperties connectionProperties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(connectionProperties);

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}
