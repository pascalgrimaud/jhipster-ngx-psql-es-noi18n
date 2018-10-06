/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestMapstructDetailComponent } from 'app/entities/test-mapstruct/test-mapstruct-detail.component';
import { TestMapstruct } from 'app/shared/model/test-mapstruct.model';

describe('Component Tests', () => {
    describe('TestMapstruct Management Detail Component', () => {
        let comp: TestMapstructDetailComponent;
        let fixture: ComponentFixture<TestMapstructDetailComponent>;
        const route = ({ data: of({ testMapstruct: new TestMapstruct(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestMapstructDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestMapstructDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestMapstructDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testMapstruct).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
