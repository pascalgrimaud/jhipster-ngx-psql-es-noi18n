/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestMapstructComponent } from 'app/entities/test-mapstruct/test-mapstruct.component';
import { TestMapstructService } from 'app/entities/test-mapstruct/test-mapstruct.service';
import { TestMapstruct } from 'app/shared/model/test-mapstruct.model';

describe('Component Tests', () => {
    describe('TestMapstruct Management Component', () => {
        let comp: TestMapstructComponent;
        let fixture: ComponentFixture<TestMapstructComponent>;
        let service: TestMapstructService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestMapstructComponent],
                providers: []
            })
                .overrideTemplate(TestMapstructComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestMapstructComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestMapstructService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestMapstruct(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testMapstructs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
