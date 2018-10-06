/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestTwoRelationshipsSameEntityMySuffixDetailComponent } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix-detail.component';
import { TestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';

describe('Component Tests', () => {
    describe('TestTwoRelationshipsSameEntityMySuffix Management Detail Component', () => {
        let comp: TestTwoRelationshipsSameEntityMySuffixDetailComponent;
        let fixture: ComponentFixture<TestTwoRelationshipsSameEntityMySuffixDetailComponent>;
        const route = ({
            data: of({ testTwoRelationshipsSameEntity: new TestTwoRelationshipsSameEntityMySuffix(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestTwoRelationshipsSameEntityMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestTwoRelationshipsSameEntityMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestTwoRelationshipsSameEntityMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testTwoRelationshipsSameEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
