package com.ssafy.archiview.signalingserver.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
@RequestMapping("/api/files")
public class FileController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping(path = "/recording/{sessionId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public Resource streamVideo(@PathVariable String sessionId) throws IOException {
        return new ByteArrayResource((FileCopyUtils.copyToByteArray(new FileInputStream(
                "/opt/openvidu/recordings/" + sessionId + "/" + sessionId + ".mp4"
        ))));
        // 경로 예시 -> /opt/openvidu/recordings/ses_FPOx25ZwAA/ses_FPOx25ZwAA.mp4
        // https://i10b105.p.ssafy.io/api/files/recording/{sessionId}
    }

    @GetMapping(path = "/thumbnail/{sessionId}")
    public Resource downloadThumbnailImage(@PathVariable String sessionId) throws IOException {
        return new ByteArrayResource((FileCopyUtils.copyToByteArray(new FileInputStream(
                "/opt/openvidu/recordings/" + sessionId + "/" + sessionId + ".jpg"
        ))));
    }

    @PostMapping("/profile/{id}")
    public ResponseEntity<?> uploadProfileImage(@PathVariable String id, @RequestParam("img") MultipartFile img ) throws IOException {
        File file = new File("/opt/openvidu/profiles/" + id);
        if (file.createNewFile()) logger.info("New Profile Img Created: " + file.getPath());
        img.transferTo(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/profile/{id}")
    public Resource downloadProfileImage(@PathVariable String id) throws IOException {
        return new ByteArrayResource((FileCopyUtils.copyToByteArray(new FileInputStream(
             "/opt/openvidu/profiles/" + id
        ))));
    }
}
