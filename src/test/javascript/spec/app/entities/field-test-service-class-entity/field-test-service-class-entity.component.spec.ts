/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityComponent } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity.component';
import { FieldTestServiceClassEntityService } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity.service';
import { FieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';

describe('Component Tests', () => {
    describe('FieldTestServiceClassEntity Management Component', () => {
        let comp: FieldTestServiceClassEntityComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityComponent>;
        let service: FieldTestServiceClassEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceClassEntityComponent],
                providers: []
            })
                .overrideTemplate(FieldTestServiceClassEntityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestServiceClassEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceClassEntityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FieldTestServiceClassEntity(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fieldTestServiceClassEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
