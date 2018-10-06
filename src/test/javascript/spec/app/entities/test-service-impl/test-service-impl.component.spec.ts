/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceImplComponent } from 'app/entities/test-service-impl/test-service-impl.component';
import { TestServiceImplService } from 'app/entities/test-service-impl/test-service-impl.service';
import { TestServiceImpl } from 'app/shared/model/test-service-impl.model';

describe('Component Tests', () => {
    describe('TestServiceImpl Management Component', () => {
        let comp: TestServiceImplComponent;
        let fixture: ComponentFixture<TestServiceImplComponent>;
        let service: TestServiceImplService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceImplComponent],
                providers: []
            })
                .overrideTemplate(TestServiceImplComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestServiceImplComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestServiceImplService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestServiceImpl(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testServiceImpls[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
