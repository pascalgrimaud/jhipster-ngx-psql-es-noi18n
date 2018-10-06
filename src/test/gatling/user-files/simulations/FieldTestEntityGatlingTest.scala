import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the FieldTestEntity entity.
 */
class FieldTestEntityGatlingTest extends Simulation {

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

    val scn = scenario("Test the FieldTestEntity entity")
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
            exec(http("Get all fieldTestEntities")
            .get("/api/field-test-entities")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new fieldTestEntity")
            .post("/api/field-test-entities")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "stringTom":"SAMPLE_TEXT", "stringRequiredTom":"SAMPLE_TEXT", "stringMinlengthTom":"SAMPLE_TEXT", "stringMaxlengthTom":"SAMPLE_TEXT", "stringPatternTom":"SAMPLE_TEXT", "integerTom":"0", "integerRequiredTom":"0", "integerMinTom":"0", "integerMaxTom":"0", "longTom":null, "longRequiredTom":null, "longMinTom":null, "longMaxTom":null, "floatTom":null, "floatRequiredTom":null, "floatMinTom":null, "floatMaxTom":null, "doubleRequiredTom":null, "doubleMinTom":null, "doubleMaxTom":null, "bigDecimalRequiredTom":"0", "bigDecimalMinTom":"0", "bigDecimalMaxTom":"0", "localDateTom":"2020-01-01T00:00:00.000Z", "localDateRequiredTom":"2020-01-01T00:00:00.000Z", "instantTom":"2020-01-01T00:00:00.000Z", "instantRequiredTom":"2020-01-01T00:00:00.000Z", "zonedDateTimeTom":"2020-01-01T00:00:00.000Z", "zonedDateTimeRequiredTom":"2020-01-01T00:00:00.000Z", "booleanTom":null, "booleanRequiredTom":null, "enumTom":null, "enumRequiredTom":null, "byteImageTom":null, "byteImageRequiredTom":null, "byteImageMinbytesTom":null, "byteImageMaxbytesTom":null, "byteAnyTom":null, "byteAnyRequiredTom":null, "byteAnyMinbytesTom":null, "byteAnyMaxbytesTom":null, "byteTextTom":null, "byteTextRequiredTom":null, "byteTextMinbytesTom":null, "byteTextMaxbytesTom":null}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_fieldTestEntity_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created fieldTestEntity")
                .get("${new_fieldTestEntity_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created fieldTestEntity")
            .delete("${new_fieldTestEntity_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) over (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
