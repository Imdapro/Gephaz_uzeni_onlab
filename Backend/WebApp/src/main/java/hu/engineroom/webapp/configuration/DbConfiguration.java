package hu.engineroom.webapp.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EntityScan(basePackages = "hu.engineroom")
public class DbConfiguration {
}
