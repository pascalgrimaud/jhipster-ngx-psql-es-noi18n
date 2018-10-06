/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestEntityMySuffixAltComponent } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt.component';
import { TestEntityMySuffixAltService } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt.service';
import { TestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';

describe('Component Tests', () => {
    describe('TestEntityMySuffixAlt Management Component', () => {
        let comp: TestEntityMySuffixAltComponent;
        let fixture: ComponentFixture<TestEntityMySuffixAltComponent>;
        let service: TestEntityMySuffixAltService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestEntityMySuffixAltComponent],
                providers: []
            })
                .overrideTemplate(TestEntityMySuffixAltComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestEntityMySuffixAltComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestEntityMySuffixAltService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestEntityMySuffixAlt(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
