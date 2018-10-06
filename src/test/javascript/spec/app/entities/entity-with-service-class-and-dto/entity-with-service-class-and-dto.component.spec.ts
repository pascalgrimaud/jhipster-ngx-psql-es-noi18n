/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassAndDTOComponent } from 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.component';
import { EntityWithServiceClassAndDTOService } from 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.service';
import { EntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassAndDTO Management Component', () => {
        let comp: EntityWithServiceClassAndDTOComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndDTOComponent>;
        let service: EntityWithServiceClassAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassAndDTOComponent],
                providers: []
            })
                .overrideTemplate(EntityWithServiceClassAndDTOComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceClassAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndDTOService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntityWithServiceClassAndDTO(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entityWithServiceClassAndDTOS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
