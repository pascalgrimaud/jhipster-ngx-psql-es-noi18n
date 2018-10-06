/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestEntityComponent } from 'app/entities/field-test-entity/field-test-entity.component';
import { FieldTestEntityService } from 'app/entities/field-test-entity/field-test-entity.service';
import { FieldTestEntity } from 'app/shared/model/field-test-entity.model';

describe('Component Tests', () => {
    describe('FieldTestEntity Management Component', () => {
        let comp: FieldTestEntityComponent;
        let fixture: ComponentFixture<FieldTestEntityComponent>;
        let service: FieldTestEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestEntityComponent],
                providers: []
            })
                .overrideTemplate(FieldTestEntityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestEntityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FieldTestEntity(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fieldTestEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
