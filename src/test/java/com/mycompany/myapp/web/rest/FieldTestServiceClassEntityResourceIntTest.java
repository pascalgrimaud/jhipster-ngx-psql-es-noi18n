package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TravisPsqlEsNoi18NApp;

import com.mycompany.myapp.domain.FieldTestServiceClassEntity;
import com.mycompany.myapp.repository.FieldTestServiceClassEntityRepository;
import com.mycompany.myapp.repository.search.FieldTestServiceClassEntitySearchRepository;
import com.mycompany.myapp.service.FieldTestServiceClassEntityService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.FieldTestServiceClassEntityCriteria;
import com.mycompany.myapp.service.FieldTestServiceClassEntityQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.EnumFieldClass;
import com.mycompany.myapp.domain.enumeration.EnumRequiredFieldClass;
/**
 * Test class for the FieldTestServiceClassEntityResource REST controller.
 *
 * @see FieldTestServiceClassEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravisPsqlEsNoi18NApp.class)
public class FieldTestServiceClassEntityResourceIntTest {

    private static final String DEFAULT_STRING_BOB = "AAAAAAAAAA";
    private static final String UPDATED_STRING_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_STRING_REQUIRED_BOB = "AAAAAAAAAA";
    private static final String UPDATED_STRING_REQUIRED_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_STRING_MINLENGTH_BOB = "AAAAAAAAAA";
    private static final String UPDATED_STRING_MINLENGTH_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_STRING_MAXLENGTH_BOB = "AAAAAAAAAA";
    private static final String UPDATED_STRING_MAXLENGTH_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_STRING_PATTERN_BOB = "AAAAAAAAAA";
    private static final String UPDATED_STRING_PATTERN_BOB = "BBBBBBBBBB";

    private static final Integer DEFAULT_INTEGER_BOB = 1;
    private static final Integer UPDATED_INTEGER_BOB = 2;

    private static final Integer DEFAULT_INTEGER_REQUIRED_BOB = 1;
    private static final Integer UPDATED_INTEGER_REQUIRED_BOB = 2;

    private static final Integer DEFAULT_INTEGER_MIN_BOB = 0;
    private static final Integer UPDATED_INTEGER_MIN_BOB = 1;

    private static final Integer DEFAULT_INTEGER_MAX_BOB = 100;
    private static final Integer UPDATED_INTEGER_MAX_BOB = 99;

    private static final Long DEFAULT_LONG_BOB = 1L;
    private static final Long UPDATED_LONG_BOB = 2L;

    private static final Long DEFAULT_LONG_REQUIRED_BOB = 1L;
    private static final Long UPDATED_LONG_REQUIRED_BOB = 2L;

    private static final Long DEFAULT_LONG_MIN_BOB = 0L;
    private static final Long UPDATED_LONG_MIN_BOB = 1L;

    private static final Long DEFAULT_LONG_MAX_BOB = 100L;
    private static final Long UPDATED_LONG_MAX_BOB = 99L;

    private static final Float DEFAULT_FLOAT_BOB = 1F;
    private static final Float UPDATED_FLOAT_BOB = 2F;

    private static final Float DEFAULT_FLOAT_REQUIRED_BOB = 1F;
    private static final Float UPDATED_FLOAT_REQUIRED_BOB = 2F;

    private static final Float DEFAULT_FLOAT_MIN_BOB = 0F;
    private static final Float UPDATED_FLOAT_MIN_BOB = 1F;

    private static final Float DEFAULT_FLOAT_MAX_BOB = 100F;
    private static final Float UPDATED_FLOAT_MAX_BOB = 99F;

    private static final Double DEFAULT_DOUBLE_REQUIRED_BOB = 1D;
    private static final Double UPDATED_DOUBLE_REQUIRED_BOB = 2D;

    private static final Double DEFAULT_DOUBLE_MIN_BOB = 0D;
    private static final Double UPDATED_DOUBLE_MIN_BOB = 1D;

    private static final Double DEFAULT_DOUBLE_MAX_BOB = 100D;
    private static final Double UPDATED_DOUBLE_MAX_BOB = 99D;

    private static final BigDecimal DEFAULT_BIG_DECIMAL_REQUIRED_BOB = new BigDecimal(1);
    private static final BigDecimal UPDATED_BIG_DECIMAL_REQUIRED_BOB = new BigDecimal(2);

    private static final BigDecimal DEFAULT_BIG_DECIMAL_MIN_BOB = new BigDecimal(0);
    private static final BigDecimal UPDATED_BIG_DECIMAL_MIN_BOB = new BigDecimal(1);

    private static final BigDecimal DEFAULT_BIG_DECIMAL_MAX_BOB = new BigDecimal(100);
    private static final BigDecimal UPDATED_BIG_DECIMAL_MAX_BOB = new BigDecimal(99);

    private static final LocalDate DEFAULT_LOCAL_DATE_BOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LOCAL_DATE_BOB = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LOCAL_DATE_REQUIRED_BOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LOCAL_DATE_REQUIRED_BOB = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_INSTANT_BOB = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INSTANT_BOB = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_INSTANTE_REQUIRED_BOB = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INSTANTE_REQUIRED_BOB = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ZonedDateTime DEFAULT_ZONED_DATE_TIME_BOB = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ZONED_DATE_TIME_BOB = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ZONED_DATE_TIME_REQUIRED_BOB = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_BOOLEAN_BOB = false;
    private static final Boolean UPDATED_BOOLEAN_BOB = true;

    private static final Boolean DEFAULT_BOOLEAN_REQUIRED_BOB = false;
    private static final Boolean UPDATED_BOOLEAN_REQUIRED_BOB = true;

    private static final EnumFieldClass DEFAULT_ENUM_BOB = EnumFieldClass.ENUM_VALUE_1;
    private static final EnumFieldClass UPDATED_ENUM_BOB = EnumFieldClass.ENUM_VALUE_2;

    private static final EnumRequiredFieldClass DEFAULT_ENUM_REQUIRED_BOB = EnumRequiredFieldClass.ENUM_VALUE_1;
    private static final EnumRequiredFieldClass UPDATED_ENUM_REQUIRED_BOB = EnumRequiredFieldClass.ENUM_VALUE_2;

    private static final byte[] DEFAULT_BYTE_IMAGE_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_IMAGE_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_IMAGE_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_IMAGE_REQUIRED_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_IMAGE_REQUIRED_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_IMAGE_MINBYTES_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_IMAGE_MINBYTES_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_IMAGE_MAXBYTES_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_IMAGE_MAXBYTES_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_ANY_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_ANY_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_ANY_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_ANY_REQUIRED_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_ANY_REQUIRED_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_ANY_MINBYTES_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_ANY_MINBYTES_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_BYTE_ANY_MAXBYTES_BOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BYTE_ANY_MAXBYTES_BOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_BYTE_TEXT_BOB = "AAAAAAAAAA";
    private static final String UPDATED_BYTE_TEXT_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_BYTE_TEXT_REQUIRED_BOB = "AAAAAAAAAA";
    private static final String UPDATED_BYTE_TEXT_REQUIRED_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_BYTE_TEXT_MINBYTES_BOB = "AAAAAAAAAA";
    private static final String UPDATED_BYTE_TEXT_MINBYTES_BOB = "BBBBBBBBBB";

    private static final String DEFAULT_BYTE_TEXT_MAXBYTES_BOB = "AAAAAAAAAA";
    private static final String UPDATED_BYTE_TEXT_MAXBYTES_BOB = "BBBBBBBBBB";

    @Autowired
    private FieldTestServiceClassEntityRepository fieldTestServiceClassEntityRepository;
    
    @Autowired
    private FieldTestServiceClassEntityService fieldTestServiceClassEntityService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.FieldTestServiceClassEntitySearchRepositoryMockConfiguration
     */
    @Autowired
    private FieldTestServiceClassEntitySearchRepository mockFieldTestServiceClassEntitySearchRepository;

    @Autowired
    private FieldTestServiceClassEntityQueryService fieldTestServiceClassEntityQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFieldTestServiceClassEntityMockMvc;

    private FieldTestServiceClassEntity fieldTestServiceClassEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldTestServiceClassEntityResource fieldTestServiceClassEntityResource = new FieldTestServiceClassEntityResource(fieldTestServiceClassEntityService, fieldTestServiceClassEntityQueryService);
        this.restFieldTestServiceClassEntityMockMvc = MockMvcBuilders.standaloneSetup(fieldTestServiceClassEntityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldTestServiceClassEntity createEntity(EntityManager em) {
        FieldTestServiceClassEntity fieldTestServiceClassEntity = new FieldTestServiceClassEntity()
            .stringBob(DEFAULT_STRING_BOB)
            .stringRequiredBob(DEFAULT_STRING_REQUIRED_BOB)
            .stringMinlengthBob(DEFAULT_STRING_MINLENGTH_BOB)
            .stringMaxlengthBob(DEFAULT_STRING_MAXLENGTH_BOB)
            .stringPatternBob(DEFAULT_STRING_PATTERN_BOB)
            .integerBob(DEFAULT_INTEGER_BOB)
            .integerRequiredBob(DEFAULT_INTEGER_REQUIRED_BOB)
            .integerMinBob(DEFAULT_INTEGER_MIN_BOB)
            .integerMaxBob(DEFAULT_INTEGER_MAX_BOB)
            .longBob(DEFAULT_LONG_BOB)
            .longRequiredBob(DEFAULT_LONG_REQUIRED_BOB)
            .longMinBob(DEFAULT_LONG_MIN_BOB)
            .longMaxBob(DEFAULT_LONG_MAX_BOB)
            .floatBob(DEFAULT_FLOAT_BOB)
            .floatRequiredBob(DEFAULT_FLOAT_REQUIRED_BOB)
            .floatMinBob(DEFAULT_FLOAT_MIN_BOB)
            .floatMaxBob(DEFAULT_FLOAT_MAX_BOB)
            .doubleRequiredBob(DEFAULT_DOUBLE_REQUIRED_BOB)
            .doubleMinBob(DEFAULT_DOUBLE_MIN_BOB)
            .doubleMaxBob(DEFAULT_DOUBLE_MAX_BOB)
            .bigDecimalRequiredBob(DEFAULT_BIG_DECIMAL_REQUIRED_BOB)
            .bigDecimalMinBob(DEFAULT_BIG_DECIMAL_MIN_BOB)
            .bigDecimalMaxBob(DEFAULT_BIG_DECIMAL_MAX_BOB)
            .localDateBob(DEFAULT_LOCAL_DATE_BOB)
            .localDateRequiredBob(DEFAULT_LOCAL_DATE_REQUIRED_BOB)
            .instantBob(DEFAULT_INSTANT_BOB)
            .instanteRequiredBob(DEFAULT_INSTANTE_REQUIRED_BOB)
            .zonedDateTimeBob(DEFAULT_ZONED_DATE_TIME_BOB)
            .zonedDateTimeRequiredBob(DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB)
            .booleanBob(DEFAULT_BOOLEAN_BOB)
            .booleanRequiredBob(DEFAULT_BOOLEAN_REQUIRED_BOB)
            .enumBob(DEFAULT_ENUM_BOB)
            .enumRequiredBob(DEFAULT_ENUM_REQUIRED_BOB)
            .byteImageBob(DEFAULT_BYTE_IMAGE_BOB)
            .byteImageBobContentType(DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE)
            .byteImageRequiredBob(DEFAULT_BYTE_IMAGE_REQUIRED_BOB)
            .byteImageRequiredBobContentType(DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE)
            .byteImageMinbytesBob(DEFAULT_BYTE_IMAGE_MINBYTES_BOB)
            .byteImageMinbytesBobContentType(DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE)
            .byteImageMaxbytesBob(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB)
            .byteImageMaxbytesBobContentType(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE)
            .byteAnyBob(DEFAULT_BYTE_ANY_BOB)
            .byteAnyBobContentType(DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE)
            .byteAnyRequiredBob(DEFAULT_BYTE_ANY_REQUIRED_BOB)
            .byteAnyRequiredBobContentType(DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE)
            .byteAnyMinbytesBob(DEFAULT_BYTE_ANY_MINBYTES_BOB)
            .byteAnyMinbytesBobContentType(DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE)
            .byteAnyMaxbytesBob(DEFAULT_BYTE_ANY_MAXBYTES_BOB)
            .byteAnyMaxbytesBobContentType(DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE)
            .byteTextBob(DEFAULT_BYTE_TEXT_BOB)
            .byteTextRequiredBob(DEFAULT_BYTE_TEXT_REQUIRED_BOB)
            .byteTextMinbytesBob(DEFAULT_BYTE_TEXT_MINBYTES_BOB)
            .byteTextMaxbytesBob(DEFAULT_BYTE_TEXT_MAXBYTES_BOB);
        return fieldTestServiceClassEntity;
    }

    @Before
    public void initTest() {
        fieldTestServiceClassEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldTestServiceClassEntity() throws Exception {
        int databaseSizeBeforeCreate = fieldTestServiceClassEntityRepository.findAll().size();

        // Create the FieldTestServiceClassEntity
        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isCreated());

        // Validate the FieldTestServiceClassEntity in the database
        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeCreate + 1);
        FieldTestServiceClassEntity testFieldTestServiceClassEntity = fieldTestServiceClassEntityList.get(fieldTestServiceClassEntityList.size() - 1);
        assertThat(testFieldTestServiceClassEntity.getStringBob()).isEqualTo(DEFAULT_STRING_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringRequiredBob()).isEqualTo(DEFAULT_STRING_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringMinlengthBob()).isEqualTo(DEFAULT_STRING_MINLENGTH_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringMaxlengthBob()).isEqualTo(DEFAULT_STRING_MAXLENGTH_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringPatternBob()).isEqualTo(DEFAULT_STRING_PATTERN_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerBob()).isEqualTo(DEFAULT_INTEGER_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerRequiredBob()).isEqualTo(DEFAULT_INTEGER_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerMinBob()).isEqualTo(DEFAULT_INTEGER_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerMaxBob()).isEqualTo(DEFAULT_INTEGER_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongBob()).isEqualTo(DEFAULT_LONG_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongRequiredBob()).isEqualTo(DEFAULT_LONG_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongMinBob()).isEqualTo(DEFAULT_LONG_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongMaxBob()).isEqualTo(DEFAULT_LONG_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatBob()).isEqualTo(DEFAULT_FLOAT_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatRequiredBob()).isEqualTo(DEFAULT_FLOAT_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatMinBob()).isEqualTo(DEFAULT_FLOAT_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatMaxBob()).isEqualTo(DEFAULT_FLOAT_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getDoubleRequiredBob()).isEqualTo(DEFAULT_DOUBLE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getDoubleMinBob()).isEqualTo(DEFAULT_DOUBLE_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getDoubleMaxBob()).isEqualTo(DEFAULT_DOUBLE_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getBigDecimalRequiredBob()).isEqualTo(DEFAULT_BIG_DECIMAL_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getBigDecimalMinBob()).isEqualTo(DEFAULT_BIG_DECIMAL_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getBigDecimalMaxBob()).isEqualTo(DEFAULT_BIG_DECIMAL_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getLocalDateBob()).isEqualTo(DEFAULT_LOCAL_DATE_BOB);
        assertThat(testFieldTestServiceClassEntity.getLocalDateRequiredBob()).isEqualTo(DEFAULT_LOCAL_DATE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getInstantBob()).isEqualTo(DEFAULT_INSTANT_BOB);
        assertThat(testFieldTestServiceClassEntity.getInstanteRequiredBob()).isEqualTo(DEFAULT_INSTANTE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getZonedDateTimeBob()).isEqualTo(DEFAULT_ZONED_DATE_TIME_BOB);
        assertThat(testFieldTestServiceClassEntity.getZonedDateTimeRequiredBob()).isEqualTo(DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.isBooleanBob()).isEqualTo(DEFAULT_BOOLEAN_BOB);
        assertThat(testFieldTestServiceClassEntity.isBooleanRequiredBob()).isEqualTo(DEFAULT_BOOLEAN_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getEnumBob()).isEqualTo(DEFAULT_ENUM_BOB);
        assertThat(testFieldTestServiceClassEntity.getEnumRequiredBob()).isEqualTo(DEFAULT_ENUM_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageBob()).isEqualTo(DEFAULT_BYTE_IMAGE_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageBobContentType()).isEqualTo(DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteImageRequiredBob()).isEqualTo(DEFAULT_BYTE_IMAGE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageRequiredBobContentType()).isEqualTo(DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteImageMinbytesBob()).isEqualTo(DEFAULT_BYTE_IMAGE_MINBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageMinbytesBobContentType()).isEqualTo(DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteImageMaxbytesBob()).isEqualTo(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageMaxbytesBobContentType()).isEqualTo(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyBob()).isEqualTo(DEFAULT_BYTE_ANY_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyBobContentType()).isEqualTo(DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyRequiredBob()).isEqualTo(DEFAULT_BYTE_ANY_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyRequiredBobContentType()).isEqualTo(DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMinbytesBob()).isEqualTo(DEFAULT_BYTE_ANY_MINBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMinbytesBobContentType()).isEqualTo(DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMaxbytesBob()).isEqualTo(DEFAULT_BYTE_ANY_MAXBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMaxbytesBobContentType()).isEqualTo(DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteTextBob()).isEqualTo(DEFAULT_BYTE_TEXT_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteTextRequiredBob()).isEqualTo(DEFAULT_BYTE_TEXT_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteTextMinbytesBob()).isEqualTo(DEFAULT_BYTE_TEXT_MINBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteTextMaxbytesBob()).isEqualTo(DEFAULT_BYTE_TEXT_MAXBYTES_BOB);

        // Validate the FieldTestServiceClassEntity in Elasticsearch
        verify(mockFieldTestServiceClassEntitySearchRepository, times(1)).save(testFieldTestServiceClassEntity);
    }

    @Test
    @Transactional
    public void createFieldTestServiceClassEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldTestServiceClassEntityRepository.findAll().size();

        // Create the FieldTestServiceClassEntity with an existing ID
        fieldTestServiceClassEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        // Validate the FieldTestServiceClassEntity in the database
        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeCreate);

        // Validate the FieldTestServiceClassEntity in Elasticsearch
        verify(mockFieldTestServiceClassEntitySearchRepository, times(0)).save(fieldTestServiceClassEntity);
    }

    @Test
    @Transactional
    public void checkStringRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setStringRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntegerRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setIntegerRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLongRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setLongRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFloatRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setFloatRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDoubleRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setDoubleRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBigDecimalRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setBigDecimalRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocalDateRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setLocalDateRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInstanteRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setInstanteRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkZonedDateTimeRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setZonedDateTimeRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBooleanRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setBooleanRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnumRequiredBobIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldTestServiceClassEntityRepository.findAll().size();
        // set the field null
        fieldTestServiceClassEntity.setEnumRequiredBob(null);

        // Create the FieldTestServiceClassEntity, which fails.

        restFieldTestServiceClassEntityMockMvc.perform(post("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntities() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldTestServiceClassEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].stringBob").value(hasItem(DEFAULT_STRING_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringRequiredBob").value(hasItem(DEFAULT_STRING_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringMinlengthBob").value(hasItem(DEFAULT_STRING_MINLENGTH_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringMaxlengthBob").value(hasItem(DEFAULT_STRING_MAXLENGTH_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringPatternBob").value(hasItem(DEFAULT_STRING_PATTERN_BOB.toString())))
            .andExpect(jsonPath("$.[*].integerBob").value(hasItem(DEFAULT_INTEGER_BOB)))
            .andExpect(jsonPath("$.[*].integerRequiredBob").value(hasItem(DEFAULT_INTEGER_REQUIRED_BOB)))
            .andExpect(jsonPath("$.[*].integerMinBob").value(hasItem(DEFAULT_INTEGER_MIN_BOB)))
            .andExpect(jsonPath("$.[*].integerMaxBob").value(hasItem(DEFAULT_INTEGER_MAX_BOB)))
            .andExpect(jsonPath("$.[*].longBob").value(hasItem(DEFAULT_LONG_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longRequiredBob").value(hasItem(DEFAULT_LONG_REQUIRED_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longMinBob").value(hasItem(DEFAULT_LONG_MIN_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longMaxBob").value(hasItem(DEFAULT_LONG_MAX_BOB.intValue())))
            .andExpect(jsonPath("$.[*].floatBob").value(hasItem(DEFAULT_FLOAT_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatRequiredBob").value(hasItem(DEFAULT_FLOAT_REQUIRED_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatMinBob").value(hasItem(DEFAULT_FLOAT_MIN_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatMaxBob").value(hasItem(DEFAULT_FLOAT_MAX_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleRequiredBob").value(hasItem(DEFAULT_DOUBLE_REQUIRED_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleMinBob").value(hasItem(DEFAULT_DOUBLE_MIN_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleMaxBob").value(hasItem(DEFAULT_DOUBLE_MAX_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].bigDecimalRequiredBob").value(hasItem(DEFAULT_BIG_DECIMAL_REQUIRED_BOB.intValue())))
            .andExpect(jsonPath("$.[*].bigDecimalMinBob").value(hasItem(DEFAULT_BIG_DECIMAL_MIN_BOB.intValue())))
            .andExpect(jsonPath("$.[*].bigDecimalMaxBob").value(hasItem(DEFAULT_BIG_DECIMAL_MAX_BOB.intValue())))
            .andExpect(jsonPath("$.[*].localDateBob").value(hasItem(DEFAULT_LOCAL_DATE_BOB.toString())))
            .andExpect(jsonPath("$.[*].localDateRequiredBob").value(hasItem(DEFAULT_LOCAL_DATE_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].instantBob").value(hasItem(DEFAULT_INSTANT_BOB.toString())))
            .andExpect(jsonPath("$.[*].instanteRequiredBob").value(hasItem(DEFAULT_INSTANTE_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].zonedDateTimeBob").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_BOB))))
            .andExpect(jsonPath("$.[*].zonedDateTimeRequiredBob").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].booleanBob").value(hasItem(DEFAULT_BOOLEAN_BOB.booleanValue())))
            .andExpect(jsonPath("$.[*].booleanRequiredBob").value(hasItem(DEFAULT_BOOLEAN_REQUIRED_BOB.booleanValue())))
            .andExpect(jsonPath("$.[*].enumBob").value(hasItem(DEFAULT_ENUM_BOB.toString())))
            .andExpect(jsonPath("$.[*].enumRequiredBob").value(hasItem(DEFAULT_ENUM_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteImageBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_BOB))))
            .andExpect(jsonPath("$.[*].byteImageRequiredBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageRequiredBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].byteImageMinbytesBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageMinbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MINBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteImageMaxbytesBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageMaxbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyBobContentType").value(hasItem(DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyRequiredBobContentType").value(hasItem(DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyRequiredBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyMinbytesBobContentType").value(hasItem(DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyMinbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MINBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyMaxbytesBobContentType").value(hasItem(DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyMaxbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MAXBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteTextBob").value(hasItem(DEFAULT_BYTE_TEXT_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextRequiredBob").value(hasItem(DEFAULT_BYTE_TEXT_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextMinbytesBob").value(hasItem(DEFAULT_BYTE_TEXT_MINBYTES_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextMaxbytesBob").value(hasItem(DEFAULT_BYTE_TEXT_MAXBYTES_BOB.toString())));
    }
    
    @Test
    @Transactional
    public void getFieldTestServiceClassEntity() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get the fieldTestServiceClassEntity
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities/{id}", fieldTestServiceClassEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fieldTestServiceClassEntity.getId().intValue()))
            .andExpect(jsonPath("$.stringBob").value(DEFAULT_STRING_BOB.toString()))
            .andExpect(jsonPath("$.stringRequiredBob").value(DEFAULT_STRING_REQUIRED_BOB.toString()))
            .andExpect(jsonPath("$.stringMinlengthBob").value(DEFAULT_STRING_MINLENGTH_BOB.toString()))
            .andExpect(jsonPath("$.stringMaxlengthBob").value(DEFAULT_STRING_MAXLENGTH_BOB.toString()))
            .andExpect(jsonPath("$.stringPatternBob").value(DEFAULT_STRING_PATTERN_BOB.toString()))
            .andExpect(jsonPath("$.integerBob").value(DEFAULT_INTEGER_BOB))
            .andExpect(jsonPath("$.integerRequiredBob").value(DEFAULT_INTEGER_REQUIRED_BOB))
            .andExpect(jsonPath("$.integerMinBob").value(DEFAULT_INTEGER_MIN_BOB))
            .andExpect(jsonPath("$.integerMaxBob").value(DEFAULT_INTEGER_MAX_BOB))
            .andExpect(jsonPath("$.longBob").value(DEFAULT_LONG_BOB.intValue()))
            .andExpect(jsonPath("$.longRequiredBob").value(DEFAULT_LONG_REQUIRED_BOB.intValue()))
            .andExpect(jsonPath("$.longMinBob").value(DEFAULT_LONG_MIN_BOB.intValue()))
            .andExpect(jsonPath("$.longMaxBob").value(DEFAULT_LONG_MAX_BOB.intValue()))
            .andExpect(jsonPath("$.floatBob").value(DEFAULT_FLOAT_BOB.doubleValue()))
            .andExpect(jsonPath("$.floatRequiredBob").value(DEFAULT_FLOAT_REQUIRED_BOB.doubleValue()))
            .andExpect(jsonPath("$.floatMinBob").value(DEFAULT_FLOAT_MIN_BOB.doubleValue()))
            .andExpect(jsonPath("$.floatMaxBob").value(DEFAULT_FLOAT_MAX_BOB.doubleValue()))
            .andExpect(jsonPath("$.doubleRequiredBob").value(DEFAULT_DOUBLE_REQUIRED_BOB.doubleValue()))
            .andExpect(jsonPath("$.doubleMinBob").value(DEFAULT_DOUBLE_MIN_BOB.doubleValue()))
            .andExpect(jsonPath("$.doubleMaxBob").value(DEFAULT_DOUBLE_MAX_BOB.doubleValue()))
            .andExpect(jsonPath("$.bigDecimalRequiredBob").value(DEFAULT_BIG_DECIMAL_REQUIRED_BOB.intValue()))
            .andExpect(jsonPath("$.bigDecimalMinBob").value(DEFAULT_BIG_DECIMAL_MIN_BOB.intValue()))
            .andExpect(jsonPath("$.bigDecimalMaxBob").value(DEFAULT_BIG_DECIMAL_MAX_BOB.intValue()))
            .andExpect(jsonPath("$.localDateBob").value(DEFAULT_LOCAL_DATE_BOB.toString()))
            .andExpect(jsonPath("$.localDateRequiredBob").value(DEFAULT_LOCAL_DATE_REQUIRED_BOB.toString()))
            .andExpect(jsonPath("$.instantBob").value(DEFAULT_INSTANT_BOB.toString()))
            .andExpect(jsonPath("$.instanteRequiredBob").value(DEFAULT_INSTANTE_REQUIRED_BOB.toString()))
            .andExpect(jsonPath("$.zonedDateTimeBob").value(sameInstant(DEFAULT_ZONED_DATE_TIME_BOB)))
            .andExpect(jsonPath("$.zonedDateTimeRequiredBob").value(sameInstant(DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB)))
            .andExpect(jsonPath("$.booleanBob").value(DEFAULT_BOOLEAN_BOB.booleanValue()))
            .andExpect(jsonPath("$.booleanRequiredBob").value(DEFAULT_BOOLEAN_REQUIRED_BOB.booleanValue()))
            .andExpect(jsonPath("$.enumBob").value(DEFAULT_ENUM_BOB.toString()))
            .andExpect(jsonPath("$.enumRequiredBob").value(DEFAULT_ENUM_REQUIRED_BOB.toString()))
            .andExpect(jsonPath("$.byteImageBobContentType").value(DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteImageBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_BOB)))
            .andExpect(jsonPath("$.byteImageRequiredBobContentType").value(DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteImageRequiredBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_REQUIRED_BOB)))
            .andExpect(jsonPath("$.byteImageMinbytesBobContentType").value(DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteImageMinbytesBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MINBYTES_BOB)))
            .andExpect(jsonPath("$.byteImageMaxbytesBobContentType").value(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteImageMaxbytesBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB)))
            .andExpect(jsonPath("$.byteAnyBobContentType").value(DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteAnyBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_BOB)))
            .andExpect(jsonPath("$.byteAnyRequiredBobContentType").value(DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteAnyRequiredBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_REQUIRED_BOB)))
            .andExpect(jsonPath("$.byteAnyMinbytesBobContentType").value(DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteAnyMinbytesBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MINBYTES_BOB)))
            .andExpect(jsonPath("$.byteAnyMaxbytesBobContentType").value(DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.byteAnyMaxbytesBob").value(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MAXBYTES_BOB)))
            .andExpect(jsonPath("$.byteTextBob").value(DEFAULT_BYTE_TEXT_BOB.toString()))
            .andExpect(jsonPath("$.byteTextRequiredBob").value(DEFAULT_BYTE_TEXT_REQUIRED_BOB.toString()))
            .andExpect(jsonPath("$.byteTextMinbytesBob").value(DEFAULT_BYTE_TEXT_MINBYTES_BOB.toString()))
            .andExpect(jsonPath("$.byteTextMaxbytesBob").value(DEFAULT_BYTE_TEXT_MAXBYTES_BOB.toString()));
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringBob equals to DEFAULT_STRING_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringBob.equals=" + DEFAULT_STRING_BOB);

        // Get all the fieldTestServiceClassEntityList where stringBob equals to UPDATED_STRING_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringBob.equals=" + UPDATED_STRING_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringBob in DEFAULT_STRING_BOB or UPDATED_STRING_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringBob.in=" + DEFAULT_STRING_BOB + "," + UPDATED_STRING_BOB);

        // Get all the fieldTestServiceClassEntityList where stringBob equals to UPDATED_STRING_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringBob.in=" + UPDATED_STRING_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("stringBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where stringBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringRequiredBob equals to DEFAULT_STRING_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringRequiredBob.equals=" + DEFAULT_STRING_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where stringRequiredBob equals to UPDATED_STRING_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringRequiredBob.equals=" + UPDATED_STRING_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringRequiredBob in DEFAULT_STRING_REQUIRED_BOB or UPDATED_STRING_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringRequiredBob.in=" + DEFAULT_STRING_REQUIRED_BOB + "," + UPDATED_STRING_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where stringRequiredBob equals to UPDATED_STRING_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringRequiredBob.in=" + UPDATED_STRING_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("stringRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where stringRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringMinlengthBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringMinlengthBob equals to DEFAULT_STRING_MINLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringMinlengthBob.equals=" + DEFAULT_STRING_MINLENGTH_BOB);

        // Get all the fieldTestServiceClassEntityList where stringMinlengthBob equals to UPDATED_STRING_MINLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringMinlengthBob.equals=" + UPDATED_STRING_MINLENGTH_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringMinlengthBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringMinlengthBob in DEFAULT_STRING_MINLENGTH_BOB or UPDATED_STRING_MINLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringMinlengthBob.in=" + DEFAULT_STRING_MINLENGTH_BOB + "," + UPDATED_STRING_MINLENGTH_BOB);

        // Get all the fieldTestServiceClassEntityList where stringMinlengthBob equals to UPDATED_STRING_MINLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringMinlengthBob.in=" + UPDATED_STRING_MINLENGTH_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringMinlengthBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringMinlengthBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("stringMinlengthBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where stringMinlengthBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringMinlengthBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringMaxlengthBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringMaxlengthBob equals to DEFAULT_STRING_MAXLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringMaxlengthBob.equals=" + DEFAULT_STRING_MAXLENGTH_BOB);

        // Get all the fieldTestServiceClassEntityList where stringMaxlengthBob equals to UPDATED_STRING_MAXLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringMaxlengthBob.equals=" + UPDATED_STRING_MAXLENGTH_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringMaxlengthBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringMaxlengthBob in DEFAULT_STRING_MAXLENGTH_BOB or UPDATED_STRING_MAXLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringMaxlengthBob.in=" + DEFAULT_STRING_MAXLENGTH_BOB + "," + UPDATED_STRING_MAXLENGTH_BOB);

        // Get all the fieldTestServiceClassEntityList where stringMaxlengthBob equals to UPDATED_STRING_MAXLENGTH_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringMaxlengthBob.in=" + UPDATED_STRING_MAXLENGTH_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringMaxlengthBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringMaxlengthBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("stringMaxlengthBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where stringMaxlengthBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringMaxlengthBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringPatternBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringPatternBob equals to DEFAULT_STRING_PATTERN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringPatternBob.equals=" + DEFAULT_STRING_PATTERN_BOB);

        // Get all the fieldTestServiceClassEntityList where stringPatternBob equals to UPDATED_STRING_PATTERN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringPatternBob.equals=" + UPDATED_STRING_PATTERN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringPatternBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringPatternBob in DEFAULT_STRING_PATTERN_BOB or UPDATED_STRING_PATTERN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("stringPatternBob.in=" + DEFAULT_STRING_PATTERN_BOB + "," + UPDATED_STRING_PATTERN_BOB);

        // Get all the fieldTestServiceClassEntityList where stringPatternBob equals to UPDATED_STRING_PATTERN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringPatternBob.in=" + UPDATED_STRING_PATTERN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByStringPatternBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where stringPatternBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("stringPatternBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where stringPatternBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("stringPatternBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerBob equals to DEFAULT_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerBob.equals=" + DEFAULT_INTEGER_BOB);

        // Get all the fieldTestServiceClassEntityList where integerBob equals to UPDATED_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerBob.equals=" + UPDATED_INTEGER_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerBob in DEFAULT_INTEGER_BOB or UPDATED_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerBob.in=" + DEFAULT_INTEGER_BOB + "," + UPDATED_INTEGER_BOB);

        // Get all the fieldTestServiceClassEntityList where integerBob equals to UPDATED_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerBob.in=" + UPDATED_INTEGER_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("integerBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where integerBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerBob greater than or equals to DEFAULT_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerBob.greaterOrEqualThan=" + DEFAULT_INTEGER_BOB);

        // Get all the fieldTestServiceClassEntityList where integerBob greater than or equals to UPDATED_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerBob.greaterOrEqualThan=" + UPDATED_INTEGER_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerBob less than or equals to DEFAULT_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerBob.lessThan=" + DEFAULT_INTEGER_BOB);

        // Get all the fieldTestServiceClassEntityList where integerBob less than or equals to UPDATED_INTEGER_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerBob.lessThan=" + UPDATED_INTEGER_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob equals to DEFAULT_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerRequiredBob.equals=" + DEFAULT_INTEGER_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob equals to UPDATED_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerRequiredBob.equals=" + UPDATED_INTEGER_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob in DEFAULT_INTEGER_REQUIRED_BOB or UPDATED_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerRequiredBob.in=" + DEFAULT_INTEGER_REQUIRED_BOB + "," + UPDATED_INTEGER_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob equals to UPDATED_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerRequiredBob.in=" + UPDATED_INTEGER_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("integerRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerRequiredBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob greater than or equals to DEFAULT_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerRequiredBob.greaterOrEqualThan=" + DEFAULT_INTEGER_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob greater than or equals to UPDATED_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerRequiredBob.greaterOrEqualThan=" + UPDATED_INTEGER_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerRequiredBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob less than or equals to DEFAULT_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerRequiredBob.lessThan=" + DEFAULT_INTEGER_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where integerRequiredBob less than or equals to UPDATED_INTEGER_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerRequiredBob.lessThan=" + UPDATED_INTEGER_REQUIRED_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMinBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMinBob equals to DEFAULT_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMinBob.equals=" + DEFAULT_INTEGER_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMinBob equals to UPDATED_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMinBob.equals=" + UPDATED_INTEGER_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMinBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMinBob in DEFAULT_INTEGER_MIN_BOB or UPDATED_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMinBob.in=" + DEFAULT_INTEGER_MIN_BOB + "," + UPDATED_INTEGER_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMinBob equals to UPDATED_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMinBob.in=" + UPDATED_INTEGER_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMinBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMinBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("integerMinBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where integerMinBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMinBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMinBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMinBob greater than or equals to DEFAULT_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMinBob.greaterOrEqualThan=" + DEFAULT_INTEGER_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMinBob greater than or equals to UPDATED_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMinBob.greaterOrEqualThan=" + UPDATED_INTEGER_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMinBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMinBob less than or equals to DEFAULT_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMinBob.lessThan=" + DEFAULT_INTEGER_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMinBob less than or equals to UPDATED_INTEGER_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMinBob.lessThan=" + UPDATED_INTEGER_MIN_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMaxBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob equals to DEFAULT_INTEGER_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMaxBob.equals=" + DEFAULT_INTEGER_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob equals to UPDATED_INTEGER_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMaxBob.equals=" + UPDATED_INTEGER_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMaxBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob in DEFAULT_INTEGER_MAX_BOB or UPDATED_INTEGER_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMaxBob.in=" + DEFAULT_INTEGER_MAX_BOB + "," + UPDATED_INTEGER_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob equals to UPDATED_INTEGER_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMaxBob.in=" + UPDATED_INTEGER_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMaxBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("integerMaxBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where integerMaxBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMaxBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMaxBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob greater than or equals to DEFAULT_INTEGER_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("integerMaxBob.greaterOrEqualThan=" + DEFAULT_INTEGER_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob greater than or equals to (DEFAULT_INTEGER_MAX_BOB + 1)
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMaxBob.greaterOrEqualThan=" + (DEFAULT_INTEGER_MAX_BOB + 1));
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByIntegerMaxBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob less than or equals to DEFAULT_INTEGER_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("integerMaxBob.lessThan=" + DEFAULT_INTEGER_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where integerMaxBob less than or equals to (DEFAULT_INTEGER_MAX_BOB + 1)
        defaultFieldTestServiceClassEntityShouldBeFound("integerMaxBob.lessThan=" + (DEFAULT_INTEGER_MAX_BOB + 1));
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longBob equals to DEFAULT_LONG_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longBob.equals=" + DEFAULT_LONG_BOB);

        // Get all the fieldTestServiceClassEntityList where longBob equals to UPDATED_LONG_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longBob.equals=" + UPDATED_LONG_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longBob in DEFAULT_LONG_BOB or UPDATED_LONG_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longBob.in=" + DEFAULT_LONG_BOB + "," + UPDATED_LONG_BOB);

        // Get all the fieldTestServiceClassEntityList where longBob equals to UPDATED_LONG_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longBob.in=" + UPDATED_LONG_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("longBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where longBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("longBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longBob greater than or equals to DEFAULT_LONG_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longBob.greaterOrEqualThan=" + DEFAULT_LONG_BOB);

        // Get all the fieldTestServiceClassEntityList where longBob greater than or equals to UPDATED_LONG_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longBob.greaterOrEqualThan=" + UPDATED_LONG_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longBob less than or equals to DEFAULT_LONG_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longBob.lessThan=" + DEFAULT_LONG_BOB);

        // Get all the fieldTestServiceClassEntityList where longBob less than or equals to UPDATED_LONG_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longBob.lessThan=" + UPDATED_LONG_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob equals to DEFAULT_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longRequiredBob.equals=" + DEFAULT_LONG_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob equals to UPDATED_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longRequiredBob.equals=" + UPDATED_LONG_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob in DEFAULT_LONG_REQUIRED_BOB or UPDATED_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longRequiredBob.in=" + DEFAULT_LONG_REQUIRED_BOB + "," + UPDATED_LONG_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob equals to UPDATED_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longRequiredBob.in=" + UPDATED_LONG_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("longRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where longRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("longRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongRequiredBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob greater than or equals to DEFAULT_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longRequiredBob.greaterOrEqualThan=" + DEFAULT_LONG_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob greater than or equals to UPDATED_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longRequiredBob.greaterOrEqualThan=" + UPDATED_LONG_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongRequiredBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob less than or equals to DEFAULT_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longRequiredBob.lessThan=" + DEFAULT_LONG_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where longRequiredBob less than or equals to UPDATED_LONG_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longRequiredBob.lessThan=" + UPDATED_LONG_REQUIRED_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMinBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMinBob equals to DEFAULT_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMinBob.equals=" + DEFAULT_LONG_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where longMinBob equals to UPDATED_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMinBob.equals=" + UPDATED_LONG_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMinBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMinBob in DEFAULT_LONG_MIN_BOB or UPDATED_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMinBob.in=" + DEFAULT_LONG_MIN_BOB + "," + UPDATED_LONG_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where longMinBob equals to UPDATED_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMinBob.in=" + UPDATED_LONG_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMinBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMinBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("longMinBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where longMinBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMinBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMinBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMinBob greater than or equals to DEFAULT_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMinBob.greaterOrEqualThan=" + DEFAULT_LONG_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where longMinBob greater than or equals to UPDATED_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMinBob.greaterOrEqualThan=" + UPDATED_LONG_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMinBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMinBob less than or equals to DEFAULT_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMinBob.lessThan=" + DEFAULT_LONG_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where longMinBob less than or equals to UPDATED_LONG_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMinBob.lessThan=" + UPDATED_LONG_MIN_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMaxBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMaxBob equals to DEFAULT_LONG_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMaxBob.equals=" + DEFAULT_LONG_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where longMaxBob equals to UPDATED_LONG_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMaxBob.equals=" + UPDATED_LONG_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMaxBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMaxBob in DEFAULT_LONG_MAX_BOB or UPDATED_LONG_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMaxBob.in=" + DEFAULT_LONG_MAX_BOB + "," + UPDATED_LONG_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where longMaxBob equals to UPDATED_LONG_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMaxBob.in=" + UPDATED_LONG_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMaxBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMaxBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("longMaxBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where longMaxBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMaxBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMaxBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMaxBob greater than or equals to DEFAULT_LONG_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("longMaxBob.greaterOrEqualThan=" + DEFAULT_LONG_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where longMaxBob greater than or equals to (DEFAULT_LONG_MAX_BOB + 1)
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMaxBob.greaterOrEqualThan=" + (DEFAULT_LONG_MAX_BOB + 1));
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLongMaxBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where longMaxBob less than or equals to DEFAULT_LONG_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("longMaxBob.lessThan=" + DEFAULT_LONG_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where longMaxBob less than or equals to (DEFAULT_LONG_MAX_BOB + 1)
        defaultFieldTestServiceClassEntityShouldBeFound("longMaxBob.lessThan=" + (DEFAULT_LONG_MAX_BOB + 1));
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatBob equals to DEFAULT_FLOAT_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatBob.equals=" + DEFAULT_FLOAT_BOB);

        // Get all the fieldTestServiceClassEntityList where floatBob equals to UPDATED_FLOAT_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatBob.equals=" + UPDATED_FLOAT_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatBob in DEFAULT_FLOAT_BOB or UPDATED_FLOAT_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatBob.in=" + DEFAULT_FLOAT_BOB + "," + UPDATED_FLOAT_BOB);

        // Get all the fieldTestServiceClassEntityList where floatBob equals to UPDATED_FLOAT_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatBob.in=" + UPDATED_FLOAT_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("floatBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where floatBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatRequiredBob equals to DEFAULT_FLOAT_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatRequiredBob.equals=" + DEFAULT_FLOAT_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where floatRequiredBob equals to UPDATED_FLOAT_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatRequiredBob.equals=" + UPDATED_FLOAT_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatRequiredBob in DEFAULT_FLOAT_REQUIRED_BOB or UPDATED_FLOAT_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatRequiredBob.in=" + DEFAULT_FLOAT_REQUIRED_BOB + "," + UPDATED_FLOAT_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where floatRequiredBob equals to UPDATED_FLOAT_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatRequiredBob.in=" + UPDATED_FLOAT_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("floatRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where floatRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatMinBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatMinBob equals to DEFAULT_FLOAT_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatMinBob.equals=" + DEFAULT_FLOAT_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where floatMinBob equals to UPDATED_FLOAT_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatMinBob.equals=" + UPDATED_FLOAT_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatMinBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatMinBob in DEFAULT_FLOAT_MIN_BOB or UPDATED_FLOAT_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatMinBob.in=" + DEFAULT_FLOAT_MIN_BOB + "," + UPDATED_FLOAT_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where floatMinBob equals to UPDATED_FLOAT_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatMinBob.in=" + UPDATED_FLOAT_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatMinBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatMinBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("floatMinBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where floatMinBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatMinBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatMaxBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatMaxBob equals to DEFAULT_FLOAT_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatMaxBob.equals=" + DEFAULT_FLOAT_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where floatMaxBob equals to UPDATED_FLOAT_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatMaxBob.equals=" + UPDATED_FLOAT_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatMaxBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatMaxBob in DEFAULT_FLOAT_MAX_BOB or UPDATED_FLOAT_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("floatMaxBob.in=" + DEFAULT_FLOAT_MAX_BOB + "," + UPDATED_FLOAT_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where floatMaxBob equals to UPDATED_FLOAT_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatMaxBob.in=" + UPDATED_FLOAT_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByFloatMaxBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where floatMaxBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("floatMaxBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where floatMaxBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("floatMaxBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleRequiredBob equals to DEFAULT_DOUBLE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("doubleRequiredBob.equals=" + DEFAULT_DOUBLE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where doubleRequiredBob equals to UPDATED_DOUBLE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleRequiredBob.equals=" + UPDATED_DOUBLE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleRequiredBob in DEFAULT_DOUBLE_REQUIRED_BOB or UPDATED_DOUBLE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("doubleRequiredBob.in=" + DEFAULT_DOUBLE_REQUIRED_BOB + "," + UPDATED_DOUBLE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where doubleRequiredBob equals to UPDATED_DOUBLE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleRequiredBob.in=" + UPDATED_DOUBLE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("doubleRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where doubleRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleMinBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleMinBob equals to DEFAULT_DOUBLE_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("doubleMinBob.equals=" + DEFAULT_DOUBLE_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where doubleMinBob equals to UPDATED_DOUBLE_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleMinBob.equals=" + UPDATED_DOUBLE_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleMinBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleMinBob in DEFAULT_DOUBLE_MIN_BOB or UPDATED_DOUBLE_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("doubleMinBob.in=" + DEFAULT_DOUBLE_MIN_BOB + "," + UPDATED_DOUBLE_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where doubleMinBob equals to UPDATED_DOUBLE_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleMinBob.in=" + UPDATED_DOUBLE_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleMinBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleMinBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("doubleMinBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where doubleMinBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleMinBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleMaxBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleMaxBob equals to DEFAULT_DOUBLE_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("doubleMaxBob.equals=" + DEFAULT_DOUBLE_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where doubleMaxBob equals to UPDATED_DOUBLE_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleMaxBob.equals=" + UPDATED_DOUBLE_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleMaxBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleMaxBob in DEFAULT_DOUBLE_MAX_BOB or UPDATED_DOUBLE_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("doubleMaxBob.in=" + DEFAULT_DOUBLE_MAX_BOB + "," + UPDATED_DOUBLE_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where doubleMaxBob equals to UPDATED_DOUBLE_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleMaxBob.in=" + UPDATED_DOUBLE_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByDoubleMaxBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where doubleMaxBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("doubleMaxBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where doubleMaxBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("doubleMaxBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalRequiredBob equals to DEFAULT_BIG_DECIMAL_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalRequiredBob.equals=" + DEFAULT_BIG_DECIMAL_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where bigDecimalRequiredBob equals to UPDATED_BIG_DECIMAL_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalRequiredBob.equals=" + UPDATED_BIG_DECIMAL_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalRequiredBob in DEFAULT_BIG_DECIMAL_REQUIRED_BOB or UPDATED_BIG_DECIMAL_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalRequiredBob.in=" + DEFAULT_BIG_DECIMAL_REQUIRED_BOB + "," + UPDATED_BIG_DECIMAL_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where bigDecimalRequiredBob equals to UPDATED_BIG_DECIMAL_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalRequiredBob.in=" + UPDATED_BIG_DECIMAL_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where bigDecimalRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalMinBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMinBob equals to DEFAULT_BIG_DECIMAL_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalMinBob.equals=" + DEFAULT_BIG_DECIMAL_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMinBob equals to UPDATED_BIG_DECIMAL_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalMinBob.equals=" + UPDATED_BIG_DECIMAL_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalMinBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMinBob in DEFAULT_BIG_DECIMAL_MIN_BOB or UPDATED_BIG_DECIMAL_MIN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalMinBob.in=" + DEFAULT_BIG_DECIMAL_MIN_BOB + "," + UPDATED_BIG_DECIMAL_MIN_BOB);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMinBob equals to UPDATED_BIG_DECIMAL_MIN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalMinBob.in=" + UPDATED_BIG_DECIMAL_MIN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalMinBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMinBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalMinBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where bigDecimalMinBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalMinBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalMaxBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMaxBob equals to DEFAULT_BIG_DECIMAL_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalMaxBob.equals=" + DEFAULT_BIG_DECIMAL_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMaxBob equals to UPDATED_BIG_DECIMAL_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalMaxBob.equals=" + UPDATED_BIG_DECIMAL_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalMaxBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMaxBob in DEFAULT_BIG_DECIMAL_MAX_BOB or UPDATED_BIG_DECIMAL_MAX_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalMaxBob.in=" + DEFAULT_BIG_DECIMAL_MAX_BOB + "," + UPDATED_BIG_DECIMAL_MAX_BOB);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMaxBob equals to UPDATED_BIG_DECIMAL_MAX_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalMaxBob.in=" + UPDATED_BIG_DECIMAL_MAX_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBigDecimalMaxBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where bigDecimalMaxBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("bigDecimalMaxBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where bigDecimalMaxBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("bigDecimalMaxBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateBob equals to DEFAULT_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateBob.equals=" + DEFAULT_LOCAL_DATE_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateBob equals to UPDATED_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateBob.equals=" + UPDATED_LOCAL_DATE_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateBob in DEFAULT_LOCAL_DATE_BOB or UPDATED_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateBob.in=" + DEFAULT_LOCAL_DATE_BOB + "," + UPDATED_LOCAL_DATE_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateBob equals to UPDATED_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateBob.in=" + UPDATED_LOCAL_DATE_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("localDateBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where localDateBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateBob greater than or equals to DEFAULT_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateBob.greaterOrEqualThan=" + DEFAULT_LOCAL_DATE_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateBob greater than or equals to UPDATED_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateBob.greaterOrEqualThan=" + UPDATED_LOCAL_DATE_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateBob less than or equals to DEFAULT_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateBob.lessThan=" + DEFAULT_LOCAL_DATE_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateBob less than or equals to UPDATED_LOCAL_DATE_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateBob.lessThan=" + UPDATED_LOCAL_DATE_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob equals to DEFAULT_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateRequiredBob.equals=" + DEFAULT_LOCAL_DATE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob equals to UPDATED_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateRequiredBob.equals=" + UPDATED_LOCAL_DATE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob in DEFAULT_LOCAL_DATE_REQUIRED_BOB or UPDATED_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateRequiredBob.in=" + DEFAULT_LOCAL_DATE_REQUIRED_BOB + "," + UPDATED_LOCAL_DATE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob equals to UPDATED_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateRequiredBob.in=" + UPDATED_LOCAL_DATE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("localDateRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateRequiredBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob greater than or equals to DEFAULT_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateRequiredBob.greaterOrEqualThan=" + DEFAULT_LOCAL_DATE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob greater than or equals to UPDATED_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateRequiredBob.greaterOrEqualThan=" + UPDATED_LOCAL_DATE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByLocalDateRequiredBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob less than or equals to DEFAULT_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("localDateRequiredBob.lessThan=" + DEFAULT_LOCAL_DATE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where localDateRequiredBob less than or equals to UPDATED_LOCAL_DATE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("localDateRequiredBob.lessThan=" + UPDATED_LOCAL_DATE_REQUIRED_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByInstantBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where instantBob equals to DEFAULT_INSTANT_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("instantBob.equals=" + DEFAULT_INSTANT_BOB);

        // Get all the fieldTestServiceClassEntityList where instantBob equals to UPDATED_INSTANT_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("instantBob.equals=" + UPDATED_INSTANT_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByInstantBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where instantBob in DEFAULT_INSTANT_BOB or UPDATED_INSTANT_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("instantBob.in=" + DEFAULT_INSTANT_BOB + "," + UPDATED_INSTANT_BOB);

        // Get all the fieldTestServiceClassEntityList where instantBob equals to UPDATED_INSTANT_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("instantBob.in=" + UPDATED_INSTANT_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByInstantBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where instantBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("instantBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where instantBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("instantBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByInstanteRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where instanteRequiredBob equals to DEFAULT_INSTANTE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("instanteRequiredBob.equals=" + DEFAULT_INSTANTE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where instanteRequiredBob equals to UPDATED_INSTANTE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("instanteRequiredBob.equals=" + UPDATED_INSTANTE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByInstanteRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where instanteRequiredBob in DEFAULT_INSTANTE_REQUIRED_BOB or UPDATED_INSTANTE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("instanteRequiredBob.in=" + DEFAULT_INSTANTE_REQUIRED_BOB + "," + UPDATED_INSTANTE_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where instanteRequiredBob equals to UPDATED_INSTANTE_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("instanteRequiredBob.in=" + UPDATED_INSTANTE_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByInstanteRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where instanteRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("instanteRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where instanteRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("instanteRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob equals to DEFAULT_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeBob.equals=" + DEFAULT_ZONED_DATE_TIME_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob equals to UPDATED_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeBob.equals=" + UPDATED_ZONED_DATE_TIME_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob in DEFAULT_ZONED_DATE_TIME_BOB or UPDATED_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeBob.in=" + DEFAULT_ZONED_DATE_TIME_BOB + "," + UPDATED_ZONED_DATE_TIME_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob equals to UPDATED_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeBob.in=" + UPDATED_ZONED_DATE_TIME_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob greater than or equals to DEFAULT_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeBob.greaterOrEqualThan=" + DEFAULT_ZONED_DATE_TIME_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob greater than or equals to UPDATED_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeBob.greaterOrEqualThan=" + UPDATED_ZONED_DATE_TIME_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob less than or equals to DEFAULT_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeBob.lessThan=" + DEFAULT_ZONED_DATE_TIME_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeBob less than or equals to UPDATED_ZONED_DATE_TIME_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeBob.lessThan=" + UPDATED_ZONED_DATE_TIME_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob equals to DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeRequiredBob.equals=" + DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob equals to UPDATED_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeRequiredBob.equals=" + UPDATED_ZONED_DATE_TIME_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob in DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB or UPDATED_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeRequiredBob.in=" + DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB + "," + UPDATED_ZONED_DATE_TIME_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob equals to UPDATED_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeRequiredBob.in=" + UPDATED_ZONED_DATE_TIME_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeRequiredBobIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob greater than or equals to DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeRequiredBob.greaterOrEqualThan=" + DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob greater than or equals to UPDATED_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeRequiredBob.greaterOrEqualThan=" + UPDATED_ZONED_DATE_TIME_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByZonedDateTimeRequiredBobIsLessThanSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob less than or equals to DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("zonedDateTimeRequiredBob.lessThan=" + DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where zonedDateTimeRequiredBob less than or equals to UPDATED_ZONED_DATE_TIME_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("zonedDateTimeRequiredBob.lessThan=" + UPDATED_ZONED_DATE_TIME_REQUIRED_BOB);
    }


    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBooleanBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where booleanBob equals to DEFAULT_BOOLEAN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("booleanBob.equals=" + DEFAULT_BOOLEAN_BOB);

        // Get all the fieldTestServiceClassEntityList where booleanBob equals to UPDATED_BOOLEAN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("booleanBob.equals=" + UPDATED_BOOLEAN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBooleanBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where booleanBob in DEFAULT_BOOLEAN_BOB or UPDATED_BOOLEAN_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("booleanBob.in=" + DEFAULT_BOOLEAN_BOB + "," + UPDATED_BOOLEAN_BOB);

        // Get all the fieldTestServiceClassEntityList where booleanBob equals to UPDATED_BOOLEAN_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("booleanBob.in=" + UPDATED_BOOLEAN_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBooleanBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where booleanBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("booleanBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where booleanBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("booleanBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBooleanRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where booleanRequiredBob equals to DEFAULT_BOOLEAN_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("booleanRequiredBob.equals=" + DEFAULT_BOOLEAN_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where booleanRequiredBob equals to UPDATED_BOOLEAN_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("booleanRequiredBob.equals=" + UPDATED_BOOLEAN_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBooleanRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where booleanRequiredBob in DEFAULT_BOOLEAN_REQUIRED_BOB or UPDATED_BOOLEAN_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("booleanRequiredBob.in=" + DEFAULT_BOOLEAN_REQUIRED_BOB + "," + UPDATED_BOOLEAN_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where booleanRequiredBob equals to UPDATED_BOOLEAN_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("booleanRequiredBob.in=" + UPDATED_BOOLEAN_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByBooleanRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where booleanRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("booleanRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where booleanRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("booleanRequiredBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByEnumBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where enumBob equals to DEFAULT_ENUM_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("enumBob.equals=" + DEFAULT_ENUM_BOB);

        // Get all the fieldTestServiceClassEntityList where enumBob equals to UPDATED_ENUM_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("enumBob.equals=" + UPDATED_ENUM_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByEnumBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where enumBob in DEFAULT_ENUM_BOB or UPDATED_ENUM_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("enumBob.in=" + DEFAULT_ENUM_BOB + "," + UPDATED_ENUM_BOB);

        // Get all the fieldTestServiceClassEntityList where enumBob equals to UPDATED_ENUM_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("enumBob.in=" + UPDATED_ENUM_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByEnumBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where enumBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("enumBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where enumBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("enumBob.specified=false");
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByEnumRequiredBobIsEqualToSomething() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where enumRequiredBob equals to DEFAULT_ENUM_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("enumRequiredBob.equals=" + DEFAULT_ENUM_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where enumRequiredBob equals to UPDATED_ENUM_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("enumRequiredBob.equals=" + UPDATED_ENUM_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByEnumRequiredBobIsInShouldWork() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where enumRequiredBob in DEFAULT_ENUM_REQUIRED_BOB or UPDATED_ENUM_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldBeFound("enumRequiredBob.in=" + DEFAULT_ENUM_REQUIRED_BOB + "," + UPDATED_ENUM_REQUIRED_BOB);

        // Get all the fieldTestServiceClassEntityList where enumRequiredBob equals to UPDATED_ENUM_REQUIRED_BOB
        defaultFieldTestServiceClassEntityShouldNotBeFound("enumRequiredBob.in=" + UPDATED_ENUM_REQUIRED_BOB);
    }

    @Test
    @Transactional
    public void getAllFieldTestServiceClassEntitiesByEnumRequiredBobIsNullOrNotNull() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityRepository.saveAndFlush(fieldTestServiceClassEntity);

        // Get all the fieldTestServiceClassEntityList where enumRequiredBob is not null
        defaultFieldTestServiceClassEntityShouldBeFound("enumRequiredBob.specified=true");

        // Get all the fieldTestServiceClassEntityList where enumRequiredBob is null
        defaultFieldTestServiceClassEntityShouldNotBeFound("enumRequiredBob.specified=false");
    }
    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultFieldTestServiceClassEntityShouldBeFound(String filter) throws Exception {
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldTestServiceClassEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].stringBob").value(hasItem(DEFAULT_STRING_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringRequiredBob").value(hasItem(DEFAULT_STRING_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringMinlengthBob").value(hasItem(DEFAULT_STRING_MINLENGTH_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringMaxlengthBob").value(hasItem(DEFAULT_STRING_MAXLENGTH_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringPatternBob").value(hasItem(DEFAULT_STRING_PATTERN_BOB.toString())))
            .andExpect(jsonPath("$.[*].integerBob").value(hasItem(DEFAULT_INTEGER_BOB)))
            .andExpect(jsonPath("$.[*].integerRequiredBob").value(hasItem(DEFAULT_INTEGER_REQUIRED_BOB)))
            .andExpect(jsonPath("$.[*].integerMinBob").value(hasItem(DEFAULT_INTEGER_MIN_BOB)))
            .andExpect(jsonPath("$.[*].integerMaxBob").value(hasItem(DEFAULT_INTEGER_MAX_BOB)))
            .andExpect(jsonPath("$.[*].longBob").value(hasItem(DEFAULT_LONG_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longRequiredBob").value(hasItem(DEFAULT_LONG_REQUIRED_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longMinBob").value(hasItem(DEFAULT_LONG_MIN_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longMaxBob").value(hasItem(DEFAULT_LONG_MAX_BOB.intValue())))
            .andExpect(jsonPath("$.[*].floatBob").value(hasItem(DEFAULT_FLOAT_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatRequiredBob").value(hasItem(DEFAULT_FLOAT_REQUIRED_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatMinBob").value(hasItem(DEFAULT_FLOAT_MIN_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatMaxBob").value(hasItem(DEFAULT_FLOAT_MAX_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleRequiredBob").value(hasItem(DEFAULT_DOUBLE_REQUIRED_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleMinBob").value(hasItem(DEFAULT_DOUBLE_MIN_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleMaxBob").value(hasItem(DEFAULT_DOUBLE_MAX_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].bigDecimalRequiredBob").value(hasItem(DEFAULT_BIG_DECIMAL_REQUIRED_BOB.intValue())))
            .andExpect(jsonPath("$.[*].bigDecimalMinBob").value(hasItem(DEFAULT_BIG_DECIMAL_MIN_BOB.intValue())))
            .andExpect(jsonPath("$.[*].bigDecimalMaxBob").value(hasItem(DEFAULT_BIG_DECIMAL_MAX_BOB.intValue())))
            .andExpect(jsonPath("$.[*].localDateBob").value(hasItem(DEFAULT_LOCAL_DATE_BOB.toString())))
            .andExpect(jsonPath("$.[*].localDateRequiredBob").value(hasItem(DEFAULT_LOCAL_DATE_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].instantBob").value(hasItem(DEFAULT_INSTANT_BOB.toString())))
            .andExpect(jsonPath("$.[*].instanteRequiredBob").value(hasItem(DEFAULT_INSTANTE_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].zonedDateTimeBob").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_BOB))))
            .andExpect(jsonPath("$.[*].zonedDateTimeRequiredBob").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].booleanBob").value(hasItem(DEFAULT_BOOLEAN_BOB.booleanValue())))
            .andExpect(jsonPath("$.[*].booleanRequiredBob").value(hasItem(DEFAULT_BOOLEAN_REQUIRED_BOB.booleanValue())))
            .andExpect(jsonPath("$.[*].enumBob").value(hasItem(DEFAULT_ENUM_BOB.toString())))
            .andExpect(jsonPath("$.[*].enumRequiredBob").value(hasItem(DEFAULT_ENUM_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteImageBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_BOB))))
            .andExpect(jsonPath("$.[*].byteImageRequiredBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageRequiredBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].byteImageMinbytesBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageMinbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MINBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteImageMaxbytesBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageMaxbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyBobContentType").value(hasItem(DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyRequiredBobContentType").value(hasItem(DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyRequiredBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyMinbytesBobContentType").value(hasItem(DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyMinbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MINBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyMaxbytesBobContentType").value(hasItem(DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyMaxbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MAXBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteTextBob").value(hasItem(DEFAULT_BYTE_TEXT_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextRequiredBob").value(hasItem(DEFAULT_BYTE_TEXT_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextMinbytesBob").value(hasItem(DEFAULT_BYTE_TEXT_MINBYTES_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextMaxbytesBob").value(hasItem(DEFAULT_BYTE_TEXT_MAXBYTES_BOB.toString())));

        // Check, that the count call also returns 1
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultFieldTestServiceClassEntityShouldNotBeFound(String filter) throws Exception {
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingFieldTestServiceClassEntity() throws Exception {
        // Get the fieldTestServiceClassEntity
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/field-test-service-class-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldTestServiceClassEntity() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityService.save(fieldTestServiceClassEntity);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockFieldTestServiceClassEntitySearchRepository);

        int databaseSizeBeforeUpdate = fieldTestServiceClassEntityRepository.findAll().size();

        // Update the fieldTestServiceClassEntity
        FieldTestServiceClassEntity updatedFieldTestServiceClassEntity = fieldTestServiceClassEntityRepository.findById(fieldTestServiceClassEntity.getId()).get();
        // Disconnect from session so that the updates on updatedFieldTestServiceClassEntity are not directly saved in db
        em.detach(updatedFieldTestServiceClassEntity);
        updatedFieldTestServiceClassEntity
            .stringBob(UPDATED_STRING_BOB)
            .stringRequiredBob(UPDATED_STRING_REQUIRED_BOB)
            .stringMinlengthBob(UPDATED_STRING_MINLENGTH_BOB)
            .stringMaxlengthBob(UPDATED_STRING_MAXLENGTH_BOB)
            .stringPatternBob(UPDATED_STRING_PATTERN_BOB)
            .integerBob(UPDATED_INTEGER_BOB)
            .integerRequiredBob(UPDATED_INTEGER_REQUIRED_BOB)
            .integerMinBob(UPDATED_INTEGER_MIN_BOB)
            .integerMaxBob(UPDATED_INTEGER_MAX_BOB)
            .longBob(UPDATED_LONG_BOB)
            .longRequiredBob(UPDATED_LONG_REQUIRED_BOB)
            .longMinBob(UPDATED_LONG_MIN_BOB)
            .longMaxBob(UPDATED_LONG_MAX_BOB)
            .floatBob(UPDATED_FLOAT_BOB)
            .floatRequiredBob(UPDATED_FLOAT_REQUIRED_BOB)
            .floatMinBob(UPDATED_FLOAT_MIN_BOB)
            .floatMaxBob(UPDATED_FLOAT_MAX_BOB)
            .doubleRequiredBob(UPDATED_DOUBLE_REQUIRED_BOB)
            .doubleMinBob(UPDATED_DOUBLE_MIN_BOB)
            .doubleMaxBob(UPDATED_DOUBLE_MAX_BOB)
            .bigDecimalRequiredBob(UPDATED_BIG_DECIMAL_REQUIRED_BOB)
            .bigDecimalMinBob(UPDATED_BIG_DECIMAL_MIN_BOB)
            .bigDecimalMaxBob(UPDATED_BIG_DECIMAL_MAX_BOB)
            .localDateBob(UPDATED_LOCAL_DATE_BOB)
            .localDateRequiredBob(UPDATED_LOCAL_DATE_REQUIRED_BOB)
            .instantBob(UPDATED_INSTANT_BOB)
            .instanteRequiredBob(UPDATED_INSTANTE_REQUIRED_BOB)
            .zonedDateTimeBob(UPDATED_ZONED_DATE_TIME_BOB)
            .zonedDateTimeRequiredBob(UPDATED_ZONED_DATE_TIME_REQUIRED_BOB)
            .booleanBob(UPDATED_BOOLEAN_BOB)
            .booleanRequiredBob(UPDATED_BOOLEAN_REQUIRED_BOB)
            .enumBob(UPDATED_ENUM_BOB)
            .enumRequiredBob(UPDATED_ENUM_REQUIRED_BOB)
            .byteImageBob(UPDATED_BYTE_IMAGE_BOB)
            .byteImageBobContentType(UPDATED_BYTE_IMAGE_BOB_CONTENT_TYPE)
            .byteImageRequiredBob(UPDATED_BYTE_IMAGE_REQUIRED_BOB)
            .byteImageRequiredBobContentType(UPDATED_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE)
            .byteImageMinbytesBob(UPDATED_BYTE_IMAGE_MINBYTES_BOB)
            .byteImageMinbytesBobContentType(UPDATED_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE)
            .byteImageMaxbytesBob(UPDATED_BYTE_IMAGE_MAXBYTES_BOB)
            .byteImageMaxbytesBobContentType(UPDATED_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE)
            .byteAnyBob(UPDATED_BYTE_ANY_BOB)
            .byteAnyBobContentType(UPDATED_BYTE_ANY_BOB_CONTENT_TYPE)
            .byteAnyRequiredBob(UPDATED_BYTE_ANY_REQUIRED_BOB)
            .byteAnyRequiredBobContentType(UPDATED_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE)
            .byteAnyMinbytesBob(UPDATED_BYTE_ANY_MINBYTES_BOB)
            .byteAnyMinbytesBobContentType(UPDATED_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE)
            .byteAnyMaxbytesBob(UPDATED_BYTE_ANY_MAXBYTES_BOB)
            .byteAnyMaxbytesBobContentType(UPDATED_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE)
            .byteTextBob(UPDATED_BYTE_TEXT_BOB)
            .byteTextRequiredBob(UPDATED_BYTE_TEXT_REQUIRED_BOB)
            .byteTextMinbytesBob(UPDATED_BYTE_TEXT_MINBYTES_BOB)
            .byteTextMaxbytesBob(UPDATED_BYTE_TEXT_MAXBYTES_BOB);

        restFieldTestServiceClassEntityMockMvc.perform(put("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldTestServiceClassEntity)))
            .andExpect(status().isOk());

        // Validate the FieldTestServiceClassEntity in the database
        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeUpdate);
        FieldTestServiceClassEntity testFieldTestServiceClassEntity = fieldTestServiceClassEntityList.get(fieldTestServiceClassEntityList.size() - 1);
        assertThat(testFieldTestServiceClassEntity.getStringBob()).isEqualTo(UPDATED_STRING_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringRequiredBob()).isEqualTo(UPDATED_STRING_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringMinlengthBob()).isEqualTo(UPDATED_STRING_MINLENGTH_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringMaxlengthBob()).isEqualTo(UPDATED_STRING_MAXLENGTH_BOB);
        assertThat(testFieldTestServiceClassEntity.getStringPatternBob()).isEqualTo(UPDATED_STRING_PATTERN_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerBob()).isEqualTo(UPDATED_INTEGER_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerRequiredBob()).isEqualTo(UPDATED_INTEGER_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerMinBob()).isEqualTo(UPDATED_INTEGER_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getIntegerMaxBob()).isEqualTo(UPDATED_INTEGER_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongBob()).isEqualTo(UPDATED_LONG_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongRequiredBob()).isEqualTo(UPDATED_LONG_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongMinBob()).isEqualTo(UPDATED_LONG_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getLongMaxBob()).isEqualTo(UPDATED_LONG_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatBob()).isEqualTo(UPDATED_FLOAT_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatRequiredBob()).isEqualTo(UPDATED_FLOAT_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatMinBob()).isEqualTo(UPDATED_FLOAT_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getFloatMaxBob()).isEqualTo(UPDATED_FLOAT_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getDoubleRequiredBob()).isEqualTo(UPDATED_DOUBLE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getDoubleMinBob()).isEqualTo(UPDATED_DOUBLE_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getDoubleMaxBob()).isEqualTo(UPDATED_DOUBLE_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getBigDecimalRequiredBob()).isEqualTo(UPDATED_BIG_DECIMAL_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getBigDecimalMinBob()).isEqualTo(UPDATED_BIG_DECIMAL_MIN_BOB);
        assertThat(testFieldTestServiceClassEntity.getBigDecimalMaxBob()).isEqualTo(UPDATED_BIG_DECIMAL_MAX_BOB);
        assertThat(testFieldTestServiceClassEntity.getLocalDateBob()).isEqualTo(UPDATED_LOCAL_DATE_BOB);
        assertThat(testFieldTestServiceClassEntity.getLocalDateRequiredBob()).isEqualTo(UPDATED_LOCAL_DATE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getInstantBob()).isEqualTo(UPDATED_INSTANT_BOB);
        assertThat(testFieldTestServiceClassEntity.getInstanteRequiredBob()).isEqualTo(UPDATED_INSTANTE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getZonedDateTimeBob()).isEqualTo(UPDATED_ZONED_DATE_TIME_BOB);
        assertThat(testFieldTestServiceClassEntity.getZonedDateTimeRequiredBob()).isEqualTo(UPDATED_ZONED_DATE_TIME_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.isBooleanBob()).isEqualTo(UPDATED_BOOLEAN_BOB);
        assertThat(testFieldTestServiceClassEntity.isBooleanRequiredBob()).isEqualTo(UPDATED_BOOLEAN_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getEnumBob()).isEqualTo(UPDATED_ENUM_BOB);
        assertThat(testFieldTestServiceClassEntity.getEnumRequiredBob()).isEqualTo(UPDATED_ENUM_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageBob()).isEqualTo(UPDATED_BYTE_IMAGE_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageBobContentType()).isEqualTo(UPDATED_BYTE_IMAGE_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteImageRequiredBob()).isEqualTo(UPDATED_BYTE_IMAGE_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageRequiredBobContentType()).isEqualTo(UPDATED_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteImageMinbytesBob()).isEqualTo(UPDATED_BYTE_IMAGE_MINBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageMinbytesBobContentType()).isEqualTo(UPDATED_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteImageMaxbytesBob()).isEqualTo(UPDATED_BYTE_IMAGE_MAXBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteImageMaxbytesBobContentType()).isEqualTo(UPDATED_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyBob()).isEqualTo(UPDATED_BYTE_ANY_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyBobContentType()).isEqualTo(UPDATED_BYTE_ANY_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyRequiredBob()).isEqualTo(UPDATED_BYTE_ANY_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyRequiredBobContentType()).isEqualTo(UPDATED_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMinbytesBob()).isEqualTo(UPDATED_BYTE_ANY_MINBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMinbytesBobContentType()).isEqualTo(UPDATED_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMaxbytesBob()).isEqualTo(UPDATED_BYTE_ANY_MAXBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteAnyMaxbytesBobContentType()).isEqualTo(UPDATED_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE);
        assertThat(testFieldTestServiceClassEntity.getByteTextBob()).isEqualTo(UPDATED_BYTE_TEXT_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteTextRequiredBob()).isEqualTo(UPDATED_BYTE_TEXT_REQUIRED_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteTextMinbytesBob()).isEqualTo(UPDATED_BYTE_TEXT_MINBYTES_BOB);
        assertThat(testFieldTestServiceClassEntity.getByteTextMaxbytesBob()).isEqualTo(UPDATED_BYTE_TEXT_MAXBYTES_BOB);

        // Validate the FieldTestServiceClassEntity in Elasticsearch
        verify(mockFieldTestServiceClassEntitySearchRepository, times(1)).save(testFieldTestServiceClassEntity);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldTestServiceClassEntity() throws Exception {
        int databaseSizeBeforeUpdate = fieldTestServiceClassEntityRepository.findAll().size();

        // Create the FieldTestServiceClassEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldTestServiceClassEntityMockMvc.perform(put("/api/field-test-service-class-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestServiceClassEntity)))
            .andExpect(status().isBadRequest());

        // Validate the FieldTestServiceClassEntity in the database
        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FieldTestServiceClassEntity in Elasticsearch
        verify(mockFieldTestServiceClassEntitySearchRepository, times(0)).save(fieldTestServiceClassEntity);
    }

    @Test
    @Transactional
    public void deleteFieldTestServiceClassEntity() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityService.save(fieldTestServiceClassEntity);

        int databaseSizeBeforeDelete = fieldTestServiceClassEntityRepository.findAll().size();

        // Get the fieldTestServiceClassEntity
        restFieldTestServiceClassEntityMockMvc.perform(delete("/api/field-test-service-class-entities/{id}", fieldTestServiceClassEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FieldTestServiceClassEntity> fieldTestServiceClassEntityList = fieldTestServiceClassEntityRepository.findAll();
        assertThat(fieldTestServiceClassEntityList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FieldTestServiceClassEntity in Elasticsearch
        verify(mockFieldTestServiceClassEntitySearchRepository, times(1)).deleteById(fieldTestServiceClassEntity.getId());
    }

    @Test
    @Transactional
    public void searchFieldTestServiceClassEntity() throws Exception {
        // Initialize the database
        fieldTestServiceClassEntityService.save(fieldTestServiceClassEntity);
        when(mockFieldTestServiceClassEntitySearchRepository.search(queryStringQuery("id:" + fieldTestServiceClassEntity.getId())))
            .thenReturn(Collections.singletonList(fieldTestServiceClassEntity));
        // Search the fieldTestServiceClassEntity
        restFieldTestServiceClassEntityMockMvc.perform(get("/api/_search/field-test-service-class-entities?query=id:" + fieldTestServiceClassEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldTestServiceClassEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].stringBob").value(hasItem(DEFAULT_STRING_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringRequiredBob").value(hasItem(DEFAULT_STRING_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringMinlengthBob").value(hasItem(DEFAULT_STRING_MINLENGTH_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringMaxlengthBob").value(hasItem(DEFAULT_STRING_MAXLENGTH_BOB.toString())))
            .andExpect(jsonPath("$.[*].stringPatternBob").value(hasItem(DEFAULT_STRING_PATTERN_BOB.toString())))
            .andExpect(jsonPath("$.[*].integerBob").value(hasItem(DEFAULT_INTEGER_BOB)))
            .andExpect(jsonPath("$.[*].integerRequiredBob").value(hasItem(DEFAULT_INTEGER_REQUIRED_BOB)))
            .andExpect(jsonPath("$.[*].integerMinBob").value(hasItem(DEFAULT_INTEGER_MIN_BOB)))
            .andExpect(jsonPath("$.[*].integerMaxBob").value(hasItem(DEFAULT_INTEGER_MAX_BOB)))
            .andExpect(jsonPath("$.[*].longBob").value(hasItem(DEFAULT_LONG_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longRequiredBob").value(hasItem(DEFAULT_LONG_REQUIRED_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longMinBob").value(hasItem(DEFAULT_LONG_MIN_BOB.intValue())))
            .andExpect(jsonPath("$.[*].longMaxBob").value(hasItem(DEFAULT_LONG_MAX_BOB.intValue())))
            .andExpect(jsonPath("$.[*].floatBob").value(hasItem(DEFAULT_FLOAT_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatRequiredBob").value(hasItem(DEFAULT_FLOAT_REQUIRED_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatMinBob").value(hasItem(DEFAULT_FLOAT_MIN_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].floatMaxBob").value(hasItem(DEFAULT_FLOAT_MAX_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleRequiredBob").value(hasItem(DEFAULT_DOUBLE_REQUIRED_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleMinBob").value(hasItem(DEFAULT_DOUBLE_MIN_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].doubleMaxBob").value(hasItem(DEFAULT_DOUBLE_MAX_BOB.doubleValue())))
            .andExpect(jsonPath("$.[*].bigDecimalRequiredBob").value(hasItem(DEFAULT_BIG_DECIMAL_REQUIRED_BOB.intValue())))
            .andExpect(jsonPath("$.[*].bigDecimalMinBob").value(hasItem(DEFAULT_BIG_DECIMAL_MIN_BOB.intValue())))
            .andExpect(jsonPath("$.[*].bigDecimalMaxBob").value(hasItem(DEFAULT_BIG_DECIMAL_MAX_BOB.intValue())))
            .andExpect(jsonPath("$.[*].localDateBob").value(hasItem(DEFAULT_LOCAL_DATE_BOB.toString())))
            .andExpect(jsonPath("$.[*].localDateRequiredBob").value(hasItem(DEFAULT_LOCAL_DATE_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].instantBob").value(hasItem(DEFAULT_INSTANT_BOB.toString())))
            .andExpect(jsonPath("$.[*].instanteRequiredBob").value(hasItem(DEFAULT_INSTANTE_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].zonedDateTimeBob").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_BOB))))
            .andExpect(jsonPath("$.[*].zonedDateTimeRequiredBob").value(hasItem(sameInstant(DEFAULT_ZONED_DATE_TIME_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].booleanBob").value(hasItem(DEFAULT_BOOLEAN_BOB.booleanValue())))
            .andExpect(jsonPath("$.[*].booleanRequiredBob").value(hasItem(DEFAULT_BOOLEAN_REQUIRED_BOB.booleanValue())))
            .andExpect(jsonPath("$.[*].enumBob").value(hasItem(DEFAULT_ENUM_BOB.toString())))
            .andExpect(jsonPath("$.[*].enumRequiredBob").value(hasItem(DEFAULT_ENUM_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteImageBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_BOB))))
            .andExpect(jsonPath("$.[*].byteImageRequiredBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_REQUIRED_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageRequiredBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].byteImageMinbytesBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_MINBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageMinbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MINBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteImageMaxbytesBobContentType").value(hasItem(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteImageMaxbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_IMAGE_MAXBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyBobContentType").value(hasItem(DEFAULT_BYTE_ANY_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyRequiredBobContentType").value(hasItem(DEFAULT_BYTE_ANY_REQUIRED_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyRequiredBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_REQUIRED_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyMinbytesBobContentType").value(hasItem(DEFAULT_BYTE_ANY_MINBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyMinbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MINBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteAnyMaxbytesBobContentType").value(hasItem(DEFAULT_BYTE_ANY_MAXBYTES_BOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].byteAnyMaxbytesBob").value(hasItem(Base64Utils.encodeToString(DEFAULT_BYTE_ANY_MAXBYTES_BOB))))
            .andExpect(jsonPath("$.[*].byteTextBob").value(hasItem(DEFAULT_BYTE_TEXT_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextRequiredBob").value(hasItem(DEFAULT_BYTE_TEXT_REQUIRED_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextMinbytesBob").value(hasItem(DEFAULT_BYTE_TEXT_MINBYTES_BOB.toString())))
            .andExpect(jsonPath("$.[*].byteTextMaxbytesBob").value(hasItem(DEFAULT_BYTE_TEXT_MAXBYTES_BOB.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldTestServiceClassEntity.class);
        FieldTestServiceClassEntity fieldTestServiceClassEntity1 = new FieldTestServiceClassEntity();
        fieldTestServiceClassEntity1.setId(1L);
        FieldTestServiceClassEntity fieldTestServiceClassEntity2 = new FieldTestServiceClassEntity();
        fieldTestServiceClassEntity2.setId(fieldTestServiceClassEntity1.getId());
        assertThat(fieldTestServiceClassEntity1).isEqualTo(fieldTestServiceClassEntity2);
        fieldTestServiceClassEntity2.setId(2L);
        assertThat(fieldTestServiceClassEntity1).isNotEqualTo(fieldTestServiceClassEntity2);
        fieldTestServiceClassEntity1.setId(null);
        assertThat(fieldTestServiceClassEntity1).isNotEqualTo(fieldTestServiceClassEntity2);
    }
}
