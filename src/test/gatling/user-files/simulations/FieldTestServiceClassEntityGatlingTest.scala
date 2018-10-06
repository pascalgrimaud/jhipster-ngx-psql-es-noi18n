import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the FieldTestServiceClassEntity entity.
 */
class FieldTestServiceClassEntityGatlingTest extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseURL(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authentication = Map(
        "Content-Type" -> """application/json""",
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "Authorization" -> "${access_token}"
    )

    val scn = scenario("Test the FieldTestServiceClassEntity entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authenticate")
        .headers(headers_http_authentication)
        .body(StringBody("""{"username":"admin", "password":"admin"}""")).asJSON
        .check(header.get("Authorization").saveAs("access_token"))).exitHereIfFailed
        .pause(1)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all fieldTestServiceClassEntities")
            .get("/api/field-test-service-class-entities")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new fieldTestServiceClassEntity")
            .post("/api/field-test-service-class-entities")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "stringBob":"SAMPLE_TEXT", "stringRequiredBob":"SAMPLE_TEXT", "stringMinlengthBob":"SAMPLE_TEXT", "stringMaxlengthBob":"SAMPLE_TEXT", "stringPatternBob":"SAMPLE_TEXT", "integerBob":"0", "integerRequiredBob":"0", "integerMinBob":"0", "integerMaxBob":"0", "longBob":null, "longRequiredBob":null, "longMinBob":null, "longMaxBob":null, "floatBob":null, "floatRequiredBob":null, "floatMinBob":null, "floatMaxBob":null, "doubleRequiredBob":null, "doubleMinBob":null, "doubleMaxBob":null, "bigDecimalRequiredBob":"0", "bigDecimalMinBob":"0", "bigDecimalMaxBob":"0", "localDateBob":"2020-01-01T00:00:00.000Z", "localDateRequiredBob":"2020-01-01T00:00:00.000Z", "instantBob":"2020-01-01T00:00:00.000Z", "instanteRequiredBob":"2020-01-01T00:00:00.000Z", "zonedDateTimeBob":"2020-01-01T00:00:00.000Z", "zonedDateTimeRequiredBob":"2020-01-01T00:00:00.000Z", "booleanBob":null, "booleanRequiredBob":null, "enumBob":null, "enumRequiredBob":null, "byteImageBob":null, "byteImageRequiredBob":null, "byteImageMinbytesBob":null, "byteImageMaxbytesBob":null, "byteAnyBob":null, "byteAnyRequiredBob":null, "byteAnyMinbytesBob":null, "byteAnyMaxbytesBob":null, "byteTextBob":null, "byteTextRequiredBob":null, "byteTextMinbytesBob":null, "byteTextMaxbytesBob":null}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_fieldTestServiceClassEntity_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created fieldTestServiceClassEntity")
                .get("${new_fieldTestServiceClassEntity_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created fieldTestServiceClassEntity")
            .delete("${new_fieldTestServiceClassEntity_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) over (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
