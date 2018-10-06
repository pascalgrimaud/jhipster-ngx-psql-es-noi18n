/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassComponent } from 'app/entities/entity-with-service-class/entity-with-service-class.component';
import { EntityWithServiceClassService } from 'app/entities/entity-with-service-class/entity-with-service-class.service';
import { EntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClass Management Component', () => {
        let comp: EntityWithServiceClassComponent;
        let fixture: ComponentFixture<EntityWithServiceClassComponent>;
        let service: EntityWithServiceClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassComponent],
                providers: []
            })
                .overrideTemplate(EntityWithServiceClassComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntityWithServiceClass(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entityWithServiceClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
