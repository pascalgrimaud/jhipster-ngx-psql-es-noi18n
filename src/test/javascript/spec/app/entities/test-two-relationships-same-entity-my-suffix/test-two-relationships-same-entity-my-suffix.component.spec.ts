/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestTwoRelationshipsSameEntityMySuffixComponent } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix.component';
import { TestTwoRelationshipsSameEntityMySuffixService } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix.service';
import { TestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';

describe('Component Tests', () => {
    describe('TestTwoRelationshipsSameEntityMySuffix Management Component', () => {
        let comp: TestTwoRelationshipsSameEntityMySuffixComponent;
        let fixture: ComponentFixture<TestTwoRelationshipsSameEntityMySuffixComponent>;
        let service: TestTwoRelationshipsSameEntityMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestTwoRelationshipsSameEntityMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TestTwoRelationshipsSameEntityMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestTwoRelationshipsSameEntityMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTwoRelationshipsSameEntityMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestTwoRelationshipsSameEntityMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testTwoRelationshipsSameEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
