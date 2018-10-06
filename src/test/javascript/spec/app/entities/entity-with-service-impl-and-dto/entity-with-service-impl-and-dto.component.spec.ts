/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTOComponent } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.component';
import { EntityWithServiceImplAndDTOService } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';
import { EntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndDTO Management Component', () => {
        let comp: EntityWithServiceImplAndDTOComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTOComponent>;
        let service: EntityWithServiceImplAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndDTOComponent],
                providers: []
            })
                .overrideTemplate(EntityWithServiceImplAndDTOComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceImplAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntityWithServiceImplAndDTO(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entityWithServiceImplAndDTOS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
