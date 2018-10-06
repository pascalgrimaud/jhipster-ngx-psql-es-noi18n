/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToManyMySuffixDetailComponent } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix-detail.component';
import { TestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyToManyMySuffix Management Detail Component', () => {
        let comp: TestManyToManyMySuffixDetailComponent;
        let fixture: ComponentFixture<TestManyToManyMySuffixDetailComponent>;
        const route = ({ data: of({ testManyToMany: new TestManyToManyMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToManyMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestManyToManyMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestManyToManyMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testManyToMany).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
