/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceClassComponent } from 'app/entities/test-service-class/test-service-class.component';
import { TestServiceClassService } from 'app/entities/test-service-class/test-service-class.service';
import { TestServiceClass } from 'app/shared/model/test-service-class.model';

describe('Component Tests', () => {
    describe('TestServiceClass Management Component', () => {
        let comp: TestServiceClassComponent;
        let fixture: ComponentFixture<TestServiceClassComponent>;
        let service: TestServiceClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceClassComponent],
                providers: []
            })
                .overrideTemplate(TestServiceClassComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestServiceClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestServiceClassService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestServiceClass(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testServiceClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
