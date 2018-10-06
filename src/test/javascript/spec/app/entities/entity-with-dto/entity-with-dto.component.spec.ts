/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithDTOComponent } from 'app/entities/entity-with-dto/entity-with-dto.component';
import { EntityWithDTOService } from 'app/entities/entity-with-dto/entity-with-dto.service';
import { EntityWithDTO } from 'app/shared/model/entity-with-dto.model';

describe('Component Tests', () => {
    describe('EntityWithDTO Management Component', () => {
        let comp: EntityWithDTOComponent;
        let fixture: ComponentFixture<EntityWithDTOComponent>;
        let service: EntityWithDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithDTOComponent],
                providers: []
            })
                .overrideTemplate(EntityWithDTOComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithDTOService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntityWithDTO(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entityWithDTOS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
