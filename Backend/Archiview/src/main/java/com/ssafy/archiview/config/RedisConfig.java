package com.ssafy.archiview.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisKeyValueAdapter;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@EnableRedisRepositories(enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
public class RedisConfig {
    @Value("${spring.data.redis.host}")
    private String redisHost;
    @Value("${spring.data.redis.port}")
    private int redisPort;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        return new LettuceConnectionFactory(redisHost, redisPort);
    }
//
////    @Bean
//    // Redis 데이터 조작을 위한 템플릿 클래스, Redis의 데이터를 저장하고 읽는 등의 작업에 사용
//    // RedisRepository를 사용할 것이므로 redisTemplate은 사용하지 않음
//    // 트랜잭션 적용을 위해선 redisTemplate을 사용해야함
////    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
////        RedisTemplate<String, String> template = new RedisTemplate<>();
////        template.setConnectionFactory(redisConnectionFactory);
////        return template;
////    }
}
