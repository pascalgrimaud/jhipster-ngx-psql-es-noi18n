/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceImplDetailComponent } from 'app/entities/test-service-impl/test-service-impl-detail.component';
import { TestServiceImpl } from 'app/shared/model/test-service-impl.model';

describe('Component Tests', () => {
    describe('TestServiceImpl Management Detail Component', () => {
        let comp: TestServiceImplDetailComponent;
        let fixture: ComponentFixture<TestServiceImplDetailComponent>;
        const route = ({ data: of({ testServiceImpl: new TestServiceImpl(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceImplDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestServiceImplDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestServiceImplDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testServiceImpl).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
