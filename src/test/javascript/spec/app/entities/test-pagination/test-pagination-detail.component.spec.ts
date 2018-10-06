/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestPaginationDetailComponent } from 'app/entities/test-pagination/test-pagination-detail.component';
import { TestPagination } from 'app/shared/model/test-pagination.model';

describe('Component Tests', () => {
    describe('TestPagination Management Detail Component', () => {
        let comp: TestPaginationDetailComponent;
        let fixture: ComponentFixture<TestPaginationDetailComponent>;
        const route = ({ data: of({ testPagination: new TestPagination(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestPaginationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestPaginationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestPaginationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testPagination).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
