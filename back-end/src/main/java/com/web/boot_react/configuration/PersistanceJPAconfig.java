package com.web.boot_react.configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

//@Configuration
//@EnableTransactionManagement
//@PropertySource("classpath:application.properties")
public class PersistanceJPAconfig {
//    @Autowired
//    private DataSource dataSource;
//    @Autowired
//    private PersistanceJPAconfig persistanceJPAconfig;
//
//    @Bean
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//        em.setDataSource(dataSource); em.setPackagesToScan(new String[] {"엔티티 패키지 경로"});
//        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        em.setJpaVendorAdapter(vendorAdapter);
//        em.setJpaProperties(additionalProperties()); return em; }
//
//    Properties additionalProperties() { Properties properties = new Properties(); properties.setProperty("hibernate.hbm2ddl.auto", "update"); properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect"); return properties; }

}
