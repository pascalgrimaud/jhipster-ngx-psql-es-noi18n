/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestPagerDetailComponent } from 'app/entities/test-pager/test-pager-detail.component';
import { TestPager } from 'app/shared/model/test-pager.model';

describe('Component Tests', () => {
    describe('TestPager Management Detail Component', () => {
        let comp: TestPagerDetailComponent;
        let fixture: ComponentFixture<TestPagerDetailComponent>;
        const route = ({ data: of({ testPager: new TestPager(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestPagerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestPagerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestPagerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testPager).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
