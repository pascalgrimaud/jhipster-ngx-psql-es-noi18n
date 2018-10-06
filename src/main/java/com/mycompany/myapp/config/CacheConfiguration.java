package com.mycompany.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.BankAccount.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.BankAccount.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Label.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Label.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Operation.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Operation.class.getName() + ".labels", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestServiceClassEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestServiceImplEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestPaginationEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestPagerEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestMapstructEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestInfiniteScrollEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FieldTestEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestCustomTableName.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestCustomTableName.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestCustomTableName.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestCustomTableName.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestTwoRelationshipsSameEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceImpl.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceImpl.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceImpl.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceImpl.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceClass.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceClass.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceClass.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestServiceClass.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPagination.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPagination.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPagination.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPagination.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPager.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPager.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPager.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestPager.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestMapstruct.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestMapstruct.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestMapstruct.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestMapstruct.class.getName() + ".testManyRelPaginDTOS", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestMapstruct.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestInfiniteScroll.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestInfiniteScroll.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestInfiniteScroll.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestInfiniteScroll.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestEntity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestEntity.class.getName() + ".testManyToOnes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestEntity.class.getName() + ".testManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestEntity.class.getName() + ".userManyToManies", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestEntity.class.getName() + ".testCustomTableNames", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testEntities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testMapstructs", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testServiceClasses", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testServiceImpls", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testInfiniteScrolls", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testPagers", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testPaginations", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToMany.class.getName() + ".testCustomTableNames", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyRelPaginDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyRelPaginDTO.class.getName() + ".testMapstructs", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestManyToOne.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.TestOneToOne.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceClass.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceImpl.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithPagination.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceClassAndPagination.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceImplAndPagination.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceClassAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceImplAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceClassPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityWithServiceImplPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Division.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Division.class.getName() + ".divisionsPlaces", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Division.class.getName() + ".preferredPlaces", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Place.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Place.class.getName() + ".preferredDivisions", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
