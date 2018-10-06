/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyRelPaginDTOMySuffixDetailComponent } from 'app/entities/test-many-rel-pagin-dto-my-suffix/test-many-rel-pagin-dto-my-suffix-detail.component';
import { TestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyRelPaginDTOMySuffix Management Detail Component', () => {
        let comp: TestManyRelPaginDTOMySuffixDetailComponent;
        let fixture: ComponentFixture<TestManyRelPaginDTOMySuffixDetailComponent>;
        const route = ({ data: of({ testManyRelPaginDTO: new TestManyRelPaginDTOMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyRelPaginDTOMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestManyRelPaginDTOMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestManyRelPaginDTOMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testManyRelPaginDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
