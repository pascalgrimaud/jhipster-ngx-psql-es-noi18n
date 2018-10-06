/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestEntityMySuffixAltDetailComponent } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt-detail.component';
import { TestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';

describe('Component Tests', () => {
    describe('TestEntityMySuffixAlt Management Detail Component', () => {
        let comp: TestEntityMySuffixAltDetailComponent;
        let fixture: ComponentFixture<TestEntityMySuffixAltDetailComponent>;
        const route = ({ data: of({ testEntity: new TestEntityMySuffixAlt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestEntityMySuffixAltDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestEntityMySuffixAltDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestEntityMySuffixAltDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
