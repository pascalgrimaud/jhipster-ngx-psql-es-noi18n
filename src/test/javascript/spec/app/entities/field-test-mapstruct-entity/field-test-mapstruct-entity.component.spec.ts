/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestMapstructEntityComponent } from 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.component';
import { FieldTestMapstructEntityService } from 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.service';
import { FieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';

describe('Component Tests', () => {
    describe('FieldTestMapstructEntity Management Component', () => {
        let comp: FieldTestMapstructEntityComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityComponent>;
        let service: FieldTestMapstructEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestMapstructEntityComponent],
                providers: []
            })
                .overrideTemplate(FieldTestMapstructEntityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestMapstructEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestMapstructEntityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FieldTestMapstructEntity(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fieldTestMapstructEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
