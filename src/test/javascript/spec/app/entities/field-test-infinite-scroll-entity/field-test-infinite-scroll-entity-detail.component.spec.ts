/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestInfiniteScrollEntityDetailComponent } from 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-detail.component';
import { FieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';

describe('Component Tests', () => {
    describe('FieldTestInfiniteScrollEntity Management Detail Component', () => {
        let comp: FieldTestInfiniteScrollEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestInfiniteScrollEntityDetailComponent>;
        const route = ({ data: of({ fieldTestInfiniteScrollEntity: new FieldTestInfiniteScrollEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestInfiniteScrollEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestInfiniteScrollEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestInfiniteScrollEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
