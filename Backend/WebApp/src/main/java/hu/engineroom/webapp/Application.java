package hu.engineroom.webapp;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@CommonsLog
@SpringBootApplication(scanBasePackages = "hu.engineroom")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        log.info("EngineRoom WebApplication started!");
    }

}
