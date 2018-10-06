import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the FieldTestPagerEntity entity.
 */
class FieldTestPagerEntityGatlingTest extends Simulation {

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

    val scn = scenario("Test the FieldTestPagerEntity entity")
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
            exec(http("Get all fieldTestPagerEntities")
            .get("/api/field-test-pager-entities")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new fieldTestPagerEntity")
            .post("/api/field-test-pager-entities")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "stringJade":"SAMPLE_TEXT", "stringRequiredJade":"SAMPLE_TEXT", "stringMinlengthJade":"SAMPLE_TEXT", "stringMaxlengthJade":"SAMPLE_TEXT", "stringPatternJade":"SAMPLE_TEXT", "integerJade":"0", "integerRequiredJade":"0", "integerMinJade":"0", "integerMaxJade":"0", "longJade":null, "longRequiredJade":null, "longMinJade":null, "longMaxJade":null, "floatJade":null, "floatRequiredJade":null, "floatMinJade":null, "floatMaxJade":null, "doubleRequiredJade":null, "doubleMinJade":null, "doubleMaxJade":null, "bigDecimalRequiredJade":"0", "bigDecimalMinJade":"0", "bigDecimalMaxJade":"0", "localDateJade":"2020-01-01T00:00:00.000Z", "localDateRequiredJade":"2020-01-01T00:00:00.000Z", "instantJade":"2020-01-01T00:00:00.000Z", "instanteRequiredJade":"2020-01-01T00:00:00.000Z", "zonedDateTimeJade":"2020-01-01T00:00:00.000Z", "zonedDateTimeRequiredJade":"2020-01-01T00:00:00.000Z", "booleanJade":null, "booleanRequiredJade":null, "enumJade":null, "enumRequiredJade":null, "byteImageJade":null, "byteImageRequiredJade":null, "byteImageMinbytesJade":null, "byteImageMaxbytesJade":null, "byteAnyJade":null, "byteAnyRequiredJade":null, "byteAnyMinbytesJade":null, "byteAnyMaxbytesJade":null, "byteTextJade":null, "byteTextRequiredJade":null, "byteTextMinbytesJade":null, "byteTextMaxbytesJade":null}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_fieldTestPagerEntity_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created fieldTestPagerEntity")
                .get("${new_fieldTestPagerEntity_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created fieldTestPagerEntity")
            .delete("${new_fieldTestPagerEntity_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) over (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
