/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceImplEntityComponent } from 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity.component';
import { FieldTestServiceImplEntityService } from 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity.service';
import { FieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';

describe('Component Tests', () => {
    describe('FieldTestServiceImplEntity Management Component', () => {
        let comp: FieldTestServiceImplEntityComponent;
        let fixture: ComponentFixture<FieldTestServiceImplEntityComponent>;
        let service: FieldTestServiceImplEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceImplEntityComponent],
                providers: []
            })
                .overrideTemplate(FieldTestServiceImplEntityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestServiceImplEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceImplEntityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FieldTestServiceImplEntity(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fieldTestServiceImplEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
