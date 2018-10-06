/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToOneMySuffixDetailComponent } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix-detail.component';
import { TestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyToOneMySuffix Management Detail Component', () => {
        let comp: TestManyToOneMySuffixDetailComponent;
        let fixture: ComponentFixture<TestManyToOneMySuffixDetailComponent>;
        const route = ({ data: of({ testManyToOne: new TestManyToOneMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToOneMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestManyToOneMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestManyToOneMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testManyToOne).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
