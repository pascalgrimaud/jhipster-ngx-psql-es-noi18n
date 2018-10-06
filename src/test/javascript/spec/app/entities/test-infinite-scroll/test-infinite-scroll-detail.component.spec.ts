/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestInfiniteScrollDetailComponent } from 'app/entities/test-infinite-scroll/test-infinite-scroll-detail.component';
import { TestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';

describe('Component Tests', () => {
    describe('TestInfiniteScroll Management Detail Component', () => {
        let comp: TestInfiniteScrollDetailComponent;
        let fixture: ComponentFixture<TestInfiniteScrollDetailComponent>;
        const route = ({ data: of({ testInfiniteScroll: new TestInfiniteScroll(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestInfiniteScrollDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestInfiniteScrollDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestInfiniteScrollDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testInfiniteScroll).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
