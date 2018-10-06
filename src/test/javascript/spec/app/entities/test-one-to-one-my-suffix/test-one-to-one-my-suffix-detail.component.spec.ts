/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestOneToOneMySuffixDetailComponent } from 'app/entities/test-one-to-one-my-suffix/test-one-to-one-my-suffix-detail.component';
import { TestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';

describe('Component Tests', () => {
    describe('TestOneToOneMySuffix Management Detail Component', () => {
        let comp: TestOneToOneMySuffixDetailComponent;
        let fixture: ComponentFixture<TestOneToOneMySuffixDetailComponent>;
        const route = ({ data: of({ testOneToOne: new TestOneToOneMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestOneToOneMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestOneToOneMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestOneToOneMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testOneToOne).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
