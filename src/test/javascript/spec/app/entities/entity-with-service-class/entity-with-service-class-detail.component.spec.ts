/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassDetailComponent } from 'app/entities/entity-with-service-class/entity-with-service-class-detail.component';
import { EntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClass Management Detail Component', () => {
        let comp: EntityWithServiceClassDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassDetailComponent>;
        const route = ({ data: of({ entityWithServiceClass: new EntityWithServiceClass(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceClassDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceClassDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceClass).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
