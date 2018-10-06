/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceClassDetailComponent } from 'app/entities/test-service-class/test-service-class-detail.component';
import { TestServiceClass } from 'app/shared/model/test-service-class.model';

describe('Component Tests', () => {
    describe('TestServiceClass Management Detail Component', () => {
        let comp: TestServiceClassDetailComponent;
        let fixture: ComponentFixture<TestServiceClassDetailComponent>;
        const route = ({ data: of({ testServiceClass: new TestServiceClass(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceClassDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestServiceClassDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestServiceClassDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testServiceClass).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
