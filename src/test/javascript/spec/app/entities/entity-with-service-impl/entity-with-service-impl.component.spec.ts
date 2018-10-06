/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplComponent } from 'app/entities/entity-with-service-impl/entity-with-service-impl.component';
import { EntityWithServiceImplService } from 'app/entities/entity-with-service-impl/entity-with-service-impl.service';
import { EntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImpl Management Component', () => {
        let comp: EntityWithServiceImplComponent;
        let fixture: ComponentFixture<EntityWithServiceImplComponent>;
        let service: EntityWithServiceImplService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplComponent],
                providers: []
            })
                .overrideTemplate(EntityWithServiceImplComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceImplComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntityWithServiceImpl(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entityWithServiceImpls[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
